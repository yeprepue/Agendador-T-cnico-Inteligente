/**
 * Servidor para el Agendador Técnico Inteligente
 * Desarrollado para el proceso de selección
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Agendador Técnico')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Obtiene los eventos del calendario para pintar en FullCalendar
 */
function obtenerDisponibilidad() {
  const emailRRHH = "yeisonpretel71@gmail.com";
  const ahora = new Date();
  const inicioBusqueda = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);
  const finBusqueda = new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000);

  try {
    const calendario = CalendarApp.getCalendarById(emailRRHH) || CalendarApp.getDefaultCalendar();
    const eventos = calendario.getEvents(inicioBusqueda, finBusqueda);

    const slots = eventos.map(e => {
      // Obtenemos el correo del candidato de forma segura
      let correoCandidato = "";
      try {
        const lista = e.getGuestList();
        if (lista && lista.length > 0) correoCandidato = lista[0].getEmail();
      } catch (err) { /* Evento privado o sin invitados */ }

      return {
        id: e.getId(),
        title: e.getTitle() || "Ocupado",
        start: e.getStartTime().toISOString(), // FullCalendar necesita 'start'
        end: e.getEndTime().toISOString(),     // FullCalendar necesita 'end'
        extendedProps: {
          emailCandidato: correoCandidato,
          estado: (e.getEndTime() < ahora) ? "REALIZADO" : "PROXIMO"
        }
      };
    });

    return { slotsOcupados: slots };
  } catch (err) {
    return { error: err.message };
  }
}

/**
 * Obtiene detalles específicos de un evento para cargar en el formulario de edición
 */
function obtenerDetallesEvento(eventId) {
  try {
    const calendario = CalendarApp.getDefaultCalendar();
    const evento = calendario.getEventById(eventId);

    if (!evento) throw new Error("Evento no encontrado");

    const listaInvitados = evento.getGuestList();
    return {
      id: evento.getId(),
      titulo: evento.getTitle() || "Sin título",
      inicio: evento.getStartTime().toISOString(),
      // Si el evento es externo, no tendrá lista de invitados, enviamos vacío para no romper el front
      emailCandidato: (listaInvitados && listaInvitados.length > 0) ? listaInvitados[0].getEmail() : ""
    };
  } catch (e) {
    console.error("Error al obtener detalles: " + e.message);
    return { error: "No se pudieron cargar los detalles de este evento." };
  }
}

/**
 * Marca una entrevista como CANCELADA (No la elimina del registro)
 */
function cancelarEntrevista(eventId, emailPersistido) {
  try {
    const evento = CalendarApp.getDefaultCalendar().getEventById(eventId);
    const ahora = new Date();

    const diferenciaHoras = (evento.getStartTime() - ahora) / (1000 * 60 * 60);
    if (diferenciaHoras < 2) {
      return { error: "❌ Bloqueo de seguridad: No se puede cancelar con menos de 2 horas de antelación." };
    }

    // AQUI ESTÁ LA MAGIA: Usamos el email del modal primero, si no, buscamos en el evento.
    const emailCandidato = emailPersistido || (evento.getGuestList().length > 0 ? evento.getGuestList()[0].getEmail() : null);
    const titulo = evento.getTitle();

    evento.setTitle("❌ CANCELADO: " + titulo);
    evento.setColor(CalendarApp.EventColor.GRAY);

    if (emailCandidato) {
      const htmlCancelacion = `
        <div style="font-family:Arial; max-width:600px; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
          <div style="background:#444; color:white; padding:20px; text-align:center;"><h2>Entrevista Cancelada</h2></div>
          <div style="padding:20px;">
            <p>Hola, informamos que la entrevista <strong>${titulo}</strong> ha sido cancelada.</p>
            <p>Nos pondremos en contacto contigo si es necesario reagendar.</p>
          </div>
        </div>`;

      GmailApp.sendEmail(emailCandidato, "Cancelación de Entrevista", "Tu entrevista ha sido cancelada.", { htmlBody: htmlCancelacion });
    }

    return { mensaje: "Entrevista cancelada y candidato notificado." };
  } catch (e) {
    return { error: "Error al cancelar: " + e.message };
  }
}

/**
 * Procesa tanto agendamientos nuevos como reprogramaciones (IA + Calendar API + Gmail)
 * Requiere activar el servicio "Google Calendar API" en la pestaña de Servicios.
 */
function procesarAgendamiento(datos) {
  const API_KEY = API_KEY;
  const calendarId = "primary";
  const esEdicion = datos.esEdicion || false;
  const ahora = new Date();

  // 1. LIMPIEZA DEL ID
  let idLimpio = datos.eventId;
  if (idLimpio && idLimpio.indexOf('@google.com') > -1) {
    idLimpio = idLimpio.split('@')[0];
  }

  const fechaInicio = new Date(datos.fechaStr);
  const fechaFin = new Date(fechaInicio.getTime() + (60 * 60 * 1000)); // Duración de 1 hora

  const calendarioApp = CalendarApp.getCalendarById(calendarId) || CalendarApp.getDefaultCalendar();

  // --- 2. VALIDACIÓN DE SOLAPAMIENTOS (CHOQUES) ---
  const eventosEnRango = calendarioApp.getEvents(fechaInicio, fechaFin);

  const tieneChoque = eventosEnRango.some(evento => {
    // Si es edición, ignoramos el ID del evento que estamos moviendo
    if (esEdicion && evento.getId().split('@')[0] === idLimpio) return false;

    // Regla de oro de calendarios: hay choque si el inicio de uno es antes del fin del otro
    // Y el fin de uno es después del inicio del otro.
    const inicioE = evento.getStartTime();
    const finE = evento.getEndTime();

    return (inicioE < fechaFin && finE > fechaInicio);
  });

  if (tieneChoque) {
    return { error: "❌ Error de agenda: El horario seleccionado se cruza con otra reunión existente." };
  }

  let enlaceMeet = "";

  // --- 3. PARTE A: CALENDARIO Y GOOGLE MEET ---
  try {
    if (esEdicion && idLimpio) {
      // MODO REPROGRAMACIÓN
      let evento = Calendar.Events.get(calendarId, idLimpio);
      evento.start = { dateTime: fechaInicio.toISOString() };
      evento.end = { dateTime: fechaFin.toISOString() };
      evento.summary = `REPROGRAMADO: ${datos.candidato} - ${datos.rol}`;
      evento = Calendar.Events.patch(evento, calendarId, idLimpio, { conferenceDataVersion: 1 });
      enlaceMeet = (evento.conferenceData && evento.conferenceData.entryPoints) ? evento.conferenceData.entryPoints[0].uri : "https://meet.google.com/";
    } else {
      // MODO NUEVO EVENTO
      const resource = {
        summary: `Entrevista: ${datos.candidato} - ${datos.rol}`,
        start: { dateTime: fechaInicio.toISOString() },
        end: { dateTime: fechaFin.toISOString() },
        attendees: [{ email: datos.emailEntrevistador }],
        conferenceData: {
          createRequest: { requestId: "meet_" + Date.now(), conferenceSolutionKey: { type: "hangoutsMeet" } }
        }
      };
      let nuevoEvento = Calendar.Events.insert(resource, calendarId, { conferenceDataVersion: 1 });
      if (!nuevoEvento.conferenceData) {
        Utilities.sleep(1000);
        nuevoEvento = Calendar.Events.get(calendarId, nuevoEvento.id);
      }
      enlaceMeet = (nuevoEvento.conferenceData && nuevoEvento.conferenceData.entryPoints) ? nuevoEvento.conferenceData.entryPoints[0].uri : "https://meet.google.com/";
    }
  } catch (err) {
    return { error: "Error técnico en Calendario: " + err.message };
  }

  // --- 4. PARTE B: IA (GEMINI) ---
  const instruccionesIA = esEdicion
    ? `Redacta un correo informando una REPROGRAMACIÓN. Discúlpate por el cambio de fecha. El nuevo horario para ${datos.candidato} es ${datos.fechaStr}.`
    : `Redacta una invitación formal para una entrevista inicial de ${datos.candidato} para el rol de ${datos.rol} el día ${datos.fechaStr}.`;

  const prompt = `Actúa como reclutador senior. ${instruccionesIA} Enlace de Meet: ${enlaceMeet}. Firma: Selección de Talento.`;

  const urlIA = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const resIA = UrlFetchApp.fetch(urlIA, {
      "method": "post",
      "contentType": "application/json",
      "muteHttpExceptions": true,
      "payload": JSON.stringify({ "contents": [{ "parts": [{ "text": prompt }] }] })
    });

    const respuesta = JSON.parse(resIA.getContentText());
    if (respuesta.candidates && respuesta.candidates[0].content.parts[0].text) {
      cuerpoIA = respuesta.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Respuesta IA vacía");
    }
  } catch (e) {
    cuerpoIA = `Cordial saludo, ${datos.candidato}. Confirmamos su entrevista para el cargo de ${datos.rol} el día ${datos.fechaStr}. Enlace de acceso: ${enlaceMeet}`;
  }

  // --- 5. PARTE C: DISEÑO HTML Y ENVÍO ---
  const htmlBody = `
    <div style="font-family:Arial, sans-serif; max-width:600px; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
      <div style="background:#040025; color:white; padding:20px; text-align:center;">
        <h2 style="margin:0;">Selección de Talento</h2>
      </div>
      <div style="padding:20px; line-height:1.6; color:#333;">
        ${cuerpoIA.replace(/\n/g, '<br>')}
        <br><br>
        <div style="text-align:center;">
          <a href="${enlaceMeet}" style="background:#8ABC43; color:white; padding:15px 25px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">ENTRAR A LA ENTREVISTA</a>
        </div>
      </div>
      <div style="background:#8ABC43; height:8px;"></div>
    </div>`;

  try {
    GmailApp.sendEmail(datos.emailEntrevistador, "Entrevista Técnica", cuerpoIA, { htmlBody: htmlBody });
    return { mensaje: "¡Exitoso! Entrevista agendada y correo enviado sin cruces de horario." };
  } catch (e) {
    return { error: "Agendado en calendario, pero hubo un problema al enviar el correo: " + e.message };
  }
}
