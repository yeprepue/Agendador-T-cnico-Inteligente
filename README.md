# 📅 Agendador Técnico Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=googleappsscript&logoColor=white)]()

Sistema automatizado para la gestión y programación de entrevistas técnicas. Esta plataforma facilita la visualización de disponibilidad de RR.HH., previene el cruce de horarios y automatiza la generación de enlaces de videollamada y correos utilizando Inteligencia Artificial.

## 📑 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🛠️ Arquitectura y Tecnologías](#%EF%B8%8F-arquitectura-y-tecnologías)
- [🚀 Guía de Despliegue (GitHub + Clasp)](#-guía-de-despliegue-github--clasp)
- [🤝 Contribución](#-contribución)

## ✨ Características Principales

* **Calendario Interactivo**: Visualización en tiempo real de los espacios ocupados y disponibles en los próximos 30 días.
* **Gestión de Citas (CRUD)**: Permite agendar, reprogramar o cancelar entrevistas con validaciones de tiempo (mínimo 2 horas de antelación).
* **Integración con Google Meet**: Generación automática de enlaces de videollamada para cada evento.
* **IA para Comunicaciones**: Uso de **Gemini 1.5 Flash** para redactar correos de invitación personalizados y profesionales.
* **Notificaciones Automáticas**: Envío de confirmaciones vía Gmail con plantillas HTML estilizadas.

## 🛠️ Arquitectura y Tecnologías

**Frontend**
* **HTML5 / CSS3**: Interfaz limpia con paneles divididos.
* **Librerías**: FullCalendar (Agenda), Flatpickr (Fechas), SweetAlert2 (Alertas).

**Backend (Google Apps Script)**
* **Servicios de Google**: `CalendarApp` para agenda y `GmailApp` para notificaciones.
* **Inteligencia Artificial**: Integración con Google Generative Language API (Gemini).

## 🚀 Guía de Despliegue (GitHub + Clasp)

Para evitar copiar y pegar archivos manualmente, utilizaremos **clasp**, la herramienta de línea de comandos oficial de Google.

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

### 3. Crear el Proyecto en Google
```bash
# Crear el proyecto en tu cuenta de Google Drive
clasp create --type webapp --title "Agendador Técnico Inteligente"

# Subir los archivos locales a la nube
clasp push
```

### 4. Configuración Final
1. Abre el editor con `clasp open`.
2. En el editor web, ve a **Servicios (+)** y añade **Google Calendar API**.
3. En `Backend.gs` (antes `Backend.js`), configura tu `API_KEY` de Gemini y el `emailRRHH`.
4. Haz clic en **Implementar > Nueva implementación**, selecciona "Aplicación web" y configúrala para que sea accesible por "Cualquier persona".

## 🤝 Contribución

1. Haz un Fork del proyecto.
2. Crea tu rama (`git checkout -b feature/Mejora`).
3. Sube tus cambios (`git commit -m 'Añade nueva función'`).
4. Haz Push (`git push origin feature/Mejora`) y abre un Pull Request.

