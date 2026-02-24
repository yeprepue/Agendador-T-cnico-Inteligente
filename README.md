# 📅 Agendador Técnico Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=googleappsscript&logoColor=white)]()

Sistema automatizado para la gestión y programación de entrevistas técnicas. Esta plataforma facilita la visualización de disponibilidad de RR.HH., previene el cruce de horarios y automatiza la generación de enlaces de videollamada (Meet) y correos profesionales utilizando la IA de Gemini.

## 📑 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🛠️ Arquitectura y Tecnologías](#%EF%B8%8F-arquitectura-y-tecnologías)
- [🔑 Configuración de APIs](#-configuración-de-apis)
- [🚀 Guía de Despliegue (GitHub + Clasp)](#-guía-de-despliegue-github--clasp)
- [🤝 Contribución](#-contribución)

## ✨ Características Principales

* **Calendario Interactivo**: Visualización en tiempo real de espacios ocupados y disponibles mediante FullCalendar.
* **Gestión de Citas (CRUD)**: Agendamiento, reprogramación y cancelación con validaciones de seguridad (mínimo 2 horas antes).
* **Integración con Google Meet**: Generación automática de enlaces de reunión para cada evento.
* **IA para Comunicaciones**: Uso de **Gemini 1.5 Flash** para redactar correos de invitación personalizados.
* **Notificaciones Automáticas**: Envío de confirmaciones profesionales vía Gmail con diseño HTML.

## 🛠️ Arquitectura y Tecnologías

**Frontend**
* **HTML5 / CSS3**: Interfaz limpia y responsiva.
* **Librerías**: FullCalendar, Flatpickr (Selector de fecha), SweetAlert2 (Alertas).

**Backend (Google Apps Script)**
* **Google Services**: `CalendarApp` (Agenda), `GmailApp` (Correos).
* **IA**: Google Generative Language API.

## 🔑 Configuración de APIs

Para que el sistema funcione, necesitas configurar las siguientes credenciales:

1.  **Gemini API Key**: 
    * Ve a [Google AI Studio](https://aistudio.google.com/).
    * Crea una **API KEY** nueva.
    * *Nota: No compartas esta clave públicamente en GitHub.*
2.  **Google Calendar API**:
    * Se habilita dentro del entorno de Apps Script (ver paso 4 de la guía).

## 🚀 Guía de Despliegue (GitHub + Clasp)

Utilizaremos **clasp** para gestionar el código desde tu terminal y evitar el copiado manual.

### 1. Preparación
* Instala [Node.js](https://nodejs.org/).
* Habilita la API de Apps Script en tu cuenta: [script.google.com/home/usersettings](https://script.google.com/home/usersettings).

### 2. Instalación y Clonación
```bash
# Instalar clasp globalmente
npm install -g @google/clasp

# Clonar el repositorio
git clone [https://github.com/yeprepue/Agendador-T-cnico-Inteligente.git](https://github.com/yeprepue/Agendador-T-cnico-Inteligente.git)
cd Agendador-T-cnico-Inteligente

# Iniciar sesión en tu cuenta de Google
clasp login
```

### 3. Crear el Proyecto en Google
```bash
# Crear el proyecto en tu Drive (elige 'webapp')
clasp create --type webapp --title "Agendador Técnico Inteligente"

# Subir los archivos locales a la nube de Google
clasp push
```

### 4. Configuración Final (En la Web)
1.  Ejecuta `clasp open` para abrir el editor en tu navegador.
2.  **Activar Servicios**: En el panel izquierdo, haz clic en el botón **Servicios (+)**, busca **Google Calendar API** y agrégala.
3.  **Configurar Variables**: En el archivo `Backend.gs` (antes `Backend.js`), localiza y edita:
    * `const API_KEY = "TU_API_KEY_AQUI";` (Pega la clave de AI Studio).
    * `const emailRRHH = "tu-correo@ejemplo.com";` (El calendario que se gestionará).
4.  **Implementar**: 
    * Ve a **Implementar > Nueva implementación**.
    * Selecciona **Tipo: Aplicación web**.
    * Configura *Ejecutar como:* **Yo** y *Quién tiene acceso:* **Cualquier persona**.
    * Haz clic en "Implementar" y autoriza los permisos.

## 🤝 Contribución

1.  Haz un Fork del proyecto.
2.  Crea tu rama (`git checkout -b feature/NuevaMejora`).
3.  Sube tus cambios (`git commit -m 'Descripción del cambio'`).
4.  Haz Push (`git push origin feature/NuevaMejora`) y abre un Pull Request.

---
*Mantenido por [yeprepue](https://github.com/yeprepue)*
