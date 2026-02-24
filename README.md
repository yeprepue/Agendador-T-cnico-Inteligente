# 📅 Agendador Técnico Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=googleappsscript&logoColor=white)]()

Sistema automatizado para la gestión y programación de entrevistas técnicas. Esta plataforma facilita la visualización de disponibilidad de RR.HH., previene el cruce de horarios y automatiza la generación de enlaces de videollamada y correos utilizando Inteligencia Artificial.

## 📑 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🛠️ Arquitectura y Tecnologías](#%EF%B8%8F-arquitectura-y-tecnologías)
- [🚀 Guía de Despliegue](#-guía-de-despliegue)
- [🤝 Contribución](#-contribución)

## ✨ Características Principales

* **Calendario Interactivo**: Visualización en tiempo real de los espacios ocupados y disponibles de la cuenta de Recursos Humanos en los próximos 30 días.
* **Gestión de Citas (CRUD)**: Permite agendar nuevas entrevistas, reprogramarlas o cancelarlas. Incluye un bloqueo de seguridad que impide cancelar citas con menos de 2 horas de antelación.
* **Integración con Google Meet**: Generación y adjunción automática de enlaces de Google Meet a cada evento creado.
* **IA para Comunicaciones**: Utiliza el modelo Gemini (1.5 Flash) para redactar automáticamente correos de invitación y de reprogramación con tono profesional.
* **Notificaciones por Correo**: Envío de confirmaciones y enlaces de acceso mediante plantillas HTML a través de Gmail.

## 🛠️ Arquitectura y Tecnologías

**Frontend**
* **HTML5 / CSS3**: Diseño responsivo dividido en paneles.
* **Librerías UI**: 
  * [FullCalendar](https://fullcalendar.io/): Renderizado de la agenda mensual y semanal.
  * [Flatpickr](https://flatpickr.js.org/): Selector optimizado de fechas y horas.
  * [SweetAlert2](https://sweetalert2.github.io/): Manejo de alertas modales y confirmaciones.

**Backend (Serverless)**
* **Google Apps Script**: Lógica del servidor (`doGet`) y comunicación con el cliente mediante `google.script.run`.
* **Google Workspace Services**: `CalendarApp` y `Calendar.Events` (Advanced API) para gestión de agenda, y `GmailApp` para correos.
* **API de IA**: Google Generative Language API (`UrlFetchApp` a Gemini).

## 🚀 Guía de Despliegue

A diferencia de las aplicaciones Node.js o Python estándar, este proyecto se aloja y ejecuta en el entorno de **Google Apps Script**. Sigue estos pasos para desplegar la aplicación:

### 1. Preparación del Entorno
1. Dirígete a [script.google.com](https://script.google.com/) y crea un **Nuevo Proyecto**.
2. Renombra el proyecto a `Agendador Técnico Inteligente`.

### 2. Carga de Archivos
Crea los siguientes archivos en tu proyecto de Apps Script copiando el código fuente del repositorio:
* Crea un archivo Script llamado `Backend.gs` y pega el contenido de `Backend.js`.
* Crea un archivo HTML llamado `Index.html`.
* Crea un archivo HTML llamado `Estilos.html`.
* Crea un archivo HTML llamado `Funciones.html`.

### 3. Configuración de Servicios y Variables
1. **Activar API de Calendar**: En el panel izquierdo del editor de Apps Script, ve a **Servicios** (`+`), busca "Google Calendar API" y actívala.
2. **Configurar Cuenta**: Asegúrate de actualizar la variable `emailRRHH` en la función `obtenerDisponibilidad()` con el correo principal de la agenda.
3. **API Key de Gemini**: Modifica la variable `API_KEY` en la función `procesarAgendamiento()` con tu clave de Google AI Studio.

### 4. Despliegue como Aplicación Web
1. Haz clic en el botón azul **Implementar** (Deploy) > **Nueva implementación**.
2. Selecciona el tipo **Aplicación web**.
3. Configura:
   * *Ejecutar como*: "Yo" (Tu cuenta de Google).
   * *Quién tiene acceso*: "Cualquier persona".
4. Haz clic en **Implementar** y otorga los permisos requeridos (Calendario, Correo externo).
5. ¡Listo! Obtendrás una URL pública para acceder a tu agendador.

## 🤝 Contribución

¡Las contribuciones son bienvenidas!

1. Haz un Fork del proyecto.
2. Crea tu rama de características (`git checkout -b feature/NuevaCaracteristica`).
3. Realiza tus commits (`git commit -m 'Añade nueva característica'`).
4. Haz push a la rama (`git push origin feature/NuevaCaracteristica`).
5. Abre un Pull Request detallando tus cambios.
