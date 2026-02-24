# 📅 Agendador Técnico Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy Status](https://img.shields.io/badge/Deploy-Passing-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

Sistema automatizado para la asignación y gestión optimizada de tareas técnicas. Esta plataforma mejora la planificación de recursos, gestiona calendarios en tiempo real y reduce los tiempos de espera mediante un emparejamiento inteligente entre los requerimientos y el personal adecuado.

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura y Tecnologías](#%EF%B8%8F-arquitectura-y-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Uso Local](#-instalación-y-uso-local)
- [Despliegue (Producción)](#-despliegue-producción)
- [Contribución](#-contribución)

## ✨ Características Principales

* **Asignación Inteligente:** Empareja automáticamente a los técnicos disponibles basándose en sus habilidades y ubicación.
* **Gestión en Tiempo Real:** Actualización de estados de tickets y calendarios al instante.
* **Optimización de Rutas:** [Opcional: Reducción de tiempos de traslado para personal en campo].
* **API RESTful:** Integración sencilla con otros sistemas corporativos (CRM, ERP).

## 🛠️ Arquitectura y Tecnologías

* **Backend:** `<Node.js / Python / Java>` con `<Express / FastAPI / Spring Boot>`
* **Base de Datos:** `<PostgreSQL / MongoDB>`
* **Caché:** `Redis` (para manejo de sesiones y estados en tiempo real)
* **Infraestructura:** AWS gestionado mediante Terraform

## 📋 Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu entorno de desarrollo antes de comenzar:

* [Git](https://git-scm.com/)
* [<Lenguaje / Entorno>](<Enlace-oficial>) (ej. Node.js v18+)
* [Docker](https://www.docker.com/) y Docker Compose (para la base de datos local)
* [Terraform](https://www.terraform.io/) (para el despliegue de infraestructura)
* [AWS CLI](https://aws.amazon.com/cli/) configurado con tus credenciales

## 💻 Instalación y Uso Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/yeprepue/Agendador-T-cnico-Inteligente.git](https://github.com/yeprepue/Agendador-T-cnico-Inteligente.git)
   cd Agendador-T-cnico-Inteligente
# 📅 Agendador Técnico Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy Status](https://img.shields.io/badge/Deploy-Passing-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

Sistema automatizado para la asignación y gestión optimizada de tareas técnicas. Esta plataforma mejora la planificación de recursos, gestiona calendarios en tiempo real y reduce los tiempos de espera mediante un emparejamiento inteligente entre los requerimientos y el personal adecuado.

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura y Tecnologías](#%EF%B8%8F-arquitectura-y-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Uso Local](#-instalación-y-uso-local)
- [Despliegue (Producción)](#-despliegue-producción)
- [Contribución](#-contribución)

## ✨ Características Principales

* **Asignación Inteligente:** Empareja automáticamente a los técnicos disponibles basándose en sus habilidades y ubicación.
* **Gestión en Tiempo Real:** Actualización de estados de tickets y calendarios al instante.
* **Optimización de Rutas:** [Opcional: Reducción de tiempos de traslado para personal en campo].
* **API RESTful:** Integración sencilla con otros sistemas corporativos (CRM, ERP).

## 🛠️ Arquitectura y Tecnologías

* **Backend:** `<Node.js / Python / Java>` con `<Express / FastAPI / Spring Boot>`
* **Base de Datos:** `<PostgreSQL / MongoDB>`
* **Caché:** `Redis` (para manejo de sesiones y estados en tiempo real)
* **Infraestructura:** AWS gestionado mediante Terraform

## 📋 Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu entorno de desarrollo antes de comenzar:

* [Git](https://git-scm.com/)
* [<Lenguaje / Entorno>](<Enlace-oficial>) (ej. Node.js v18+)
* [Docker](https://www.docker.com/) y Docker Compose (para la base de datos local)
* [Terraform](https://www.terraform.io/) (para el despliegue de infraestructura)
* [AWS CLI](https://aws.amazon.com/cli/) configurado con tus credenciales

## 💻 Instalación y Uso Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

**1. Clonar el repositorio:**
```bash
git clone https://github.com/yeprepue/Agendador-T-cnico-Inteligente.git
cd Agendador-T-cnico-Inteligente
```

**2. Levantar servicios de infraestructura local (Base de datos):**
```bash
docker-compose up -d
```

**3. Instalar dependencias:**
```bash
<npm install / pip install -r requirements.txt>
```

**4. Configurar variables de entorno:**
Copia el archivo de ejemplo y configura tus credenciales locales.
```bash
cp .env.example .env
```

**5. Ejecutar la aplicación:**
```bash
<npm run dev / python main.py>
```
La API estará disponible en `http://localhost:3000` (o el puerto configurado).

## 🚀 Despliegue (Producción)

El despliegue de este proyecto está automatizado mediante **Terraform** para aprovisionar la infraestructura en **AWS**. Esto garantiza que los entornos sean replicables y seguros.

### Pasos para desplegar la infraestructura:

**1. Inicializar Terraform:**
Navega a la carpeta de infraestructura y descarga los providers necesarios.
```bash
cd terraform/environments/prod
terraform init
```

**2. Revisar el plan de ejecución:**
Verifica los recursos de AWS (EC2, RDS, VPC, etc.) que se van a crear o modificar.
```bash
terraform plan -var-file="prod.tfvars"
```

**3. Aplicar los cambios:**
Despliega la infraestructura en tu cuenta de AWS.
```bash
terraform apply -var-file="prod.tfvars"
```

**4. CI/CD:**
Una vez que la infraestructura base está arriba, cualquier push a la rama `main` activará los flujos de trabajo de GitHub Actions, los cuales construirán la imagen Docker y actualizarán el servicio correspondiente en AWS.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas mejorar el agendador:

1. Haz un Fork del proyecto.
2. Crea tu rama de características (`git checkout -b feature/NuevaCaracteristica`).
3. Realiza tus commits (`git commit -m 'Añade nueva característica'`).
4. Haz push a la rama (`git push origin feature/NuevaCaracteristica`).
5. Abre un Pull Request detallando tus cambios.

---
*Mantenido con ❤️ por el equipo de desarrollo.*
   
