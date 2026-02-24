# 📅 Agendador Técnico Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=googleappsscript&logoColor=white)]()

Sistema automatizado para la gestión y programación de entrevistas técnicas. Esta plataforma facilita la visualización de disponibilidad de RR.HH., previene el cruce de horarios y automatiza la generación de enlaces de videollamada (Meet) y correos profesionales utilizando la IA de Gemini.

## 📑 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🛠️ Arquitectura y Tecnologías](#%EF%B8%8F-arquitectura-y-tecnologías)
- [🔑 Configuración Técnica y APIs](#-configuración-técnica-y-apis)
- [🚀 Guía de Despliegue (GitHub + Clasp)](#-guía-de-despliegue-github--clasp)
- [🤝 Contribución](#-contribución)

## ✨ Características Principales

* **Calendario Interactivo**: Visualización en tiempo real de espacios ocupados y disponibles mediante FullCalendar.
* **Gestión de Citas (CRUD)**: Agendamiento, reprogramación y cancelación con validaciones de seguridad (mínimo 2 horas antes).
* **Integración con Google Meet**: Generación automática de enlaces de reunión para cada evento.
* **IA para Comunicaciones**: Uso de **Gemini 1.5 Flash** para redactar correos de invitación personalizados y profesionales.
* **Validación de Conflictos**: Lógica integrada para evitar el solapamiento de reuniones en el mismo horario.

## 🛠️ Arquitectura y Tecnologías

**Frontend**
* **HTML5 / CSS3**: Interfaz limpia con paneles divididos y diseño responsivo.
* **Librerías**: FullCalendar (Agenda), Flatpickr (Selector de fechas), SweetAlert2 (Alertas).

**Backend (Google Apps Script)**
* **Google Services**: `CalendarApp` y `GmailApp` para la gestión de eventos y notificaciones.
* **IA**: Google Generative Language API para la redacción de contenidos.

## 🔑 Configuración Técnica y APIs

Para que el servidor (`Backend.js`) funcione correctamente, se deben configurar los siguientes puntos:

### 1. Google Calendar API (Servicio Avanzado)
El sistema utiliza la API avanzada para generar enlaces de Google Meet.
* En el editor de Apps Script, ve a **Servicios (+)**.
* Busca **Google Calendar API**, selecciona la versión **v3** y agrégala.

### 2. Gemini API Key
Necesaria para la generación de correos automáticos:
* Obtén tu llave en [Google AI Studio](https://aistudio.google.com/).
* En `Backend.js`, localiza y edita:
  ```javascript
  const API_KEY = "TU_API_KEY_AQUI";
  ```

### 3. Configuración de Correo de RR.HH.
Define la cuenta de calendario que el sistema debe consultar:
* En la función `obtenerDisponibilidad()`, cambia el valor de:
  ```javascript
  const emailRRHH = "tu-correo@ejemplo.com";
  ```

## 🚀 Guía de Despliegue (GitHub + Clasp)

### 1. Preparación
* Instala [Node.js](https://nodejs.org/).
* Habilita la API de Apps Script en: [script.google.com/home/usersettings](https://script.google.com/home/usersettings).

### 2. Instalación y Clonación
```bash
# Instalar clasp globalmente
npm install -g @google/clasp

# Clonar el repositorio
git clone [https://github.com/yeprepue/Agendador-T-cnico-Inteligente.git](https://github.com/yeprepue/Agendador-T-cnico-Inteligente.git)
cd Agendador-T-cnico-Inteligente

# Iniciar sesión en Google
clasp login
```

### 3. Crear el Proyecto y Sincronizar
```bash
# Crear el proyecto en tu cuenta de Google Drive
clasp create --type webapp --title "Agendador Técnico Inteligente"

# Subir los archivos locales a la nube
clasp push
```

### 4. Implementación Final
1. Abre el editor con `clasp open`.
2. Asegúrate de haber completado los pasos de la sección **Configuración Técnica** (Calendar API y API Key).
3. Haz clic en **Implementar > Nueva implementación**, selecciona "Aplicación web".
4. Configura: *Ejecutar como:* **Yo**, *Acceso:* **Cualquier persona**.
5. Autoriza los permisos de Google Calendar y Gmail cuando se te solicite.

## 🤝 Contribución

1. Haz un Fork del proyecto.
2. Crea tu rama (`git checkout -b feature/Mejora`).
3. Realiza tus commits (`git commit -m 'Añade nueva función'`).
4. Abre un Pull Request detallando tus cambios.

---
*Mantenido por [yeprepue](https://github.com/yeprepue)*
