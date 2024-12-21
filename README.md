# Páginas Selectas / Frontend

## Descripción
Páginas Selectas es un eCommerce B2C diseñado para ofrecer una experiencia de compra única de libros. Nuestro objetivo es facilitar la exploración y adquisición de una amplia variedad de títulos a través de un sistema de recomendaciones personalizadas basado en los gustos de los usuarios. En el futuro, planeamos introducir funciones adicionales, como el intercambio de libros y la venta de mystery boxes que incluirán selecciones curadas de libros y artículos literarios.

Este proyecto de frontend, desarrollado con React, TypeScript y Vite, se centra en crear una interfaz atractiva y fácil de usar que fomente una comunidad de lectores y mejore su experiencia de compra.

Este archivo proporciona instrucciones sobre cómo instalar, ejecutar, configurar y desplegar la aplicación.

 ## Contenidos
 1. [Tecnologías utilizadas](#Tecnologías-utilizadas)
 2. [Requisitos previos](#Requisitos-previos)
 3. [Instalación](#Instalación)
 4. [Configuración](#Configuración)
 5. [Levantar el Proyecto](#Levantar-el-Proyecto)
 6. [Despliegue con Docker](#Despliegue-con-Docker)
 7. [Flujo de trabajo](#Flujo-de-trabajo)
 8. [Contacto](#Contacto)

## Tecnologías principales
- **React**
- **Redux**
- **React Router**
- **React Bootstrap**
- **JWT-decode**

## Herramientas de desarrollo
- **TypeScript**
- **ESLint**
- **Vite**
- **Docker**

## Requisitos previos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes componentes:
- **Node.js** (versión 16 o superior):
  - Puedes descargarlo desde [Node.js oficial](https://nodejs.org/).


```bash
    nvm install node
```

- **Docker**: Para el despliegue de la aplicación en un contenedor.
  - Puedes instalar Docker desde [Docker](https://www.docker.com/get-started).  

- **Typescript:**

```bash
    npm install -g typescript
```

- **Git**: Para clonar el repositorio y gestionar el control de versiones.
  - Puedes descargarlo desde [Git oficial](https://git-scm.com/).

## Instalación
1. Clona el repositorio:
 ```bash
 git clone https://github.com/bootcamp-uchile-2024/grupo-6-frontend.git
 ```
 2. Entra en el directorio del proyecto:
 ```bash
 cd nombre-del-proyecto
 ```
 3. Instala las dependencias:
 ```bash
 npm install
 ```

## Configuración

Primero debes levantar el repositorio de backend, puedes leer como hacerlo en el siguiente [link](https://github.com/bootcamp-uchile-2024/grupo-6-backend/blob/main/README.md). 


## Levantar el Proyecto
1. Para compilar el proyecto:

 ```bash
 npm run build
 ```

 2. Para ejecutar el proyecto:

 ```bash
 npm run dev
 ```

## Despliegue con Docker

Si prefieres usar Docker para ejecutar el proyecto en un contenedor, sigue estos pasos:

### Requisitos Previos

Asegúrate de tener Docker Desktop instalado en tu máquina. Puedes seguir los pasos de instalación en el siguiente [link](https://docs.docker.com/desktop/setup/install/windows-install/).

### Construcción y Ejecución con Docker
1. Construir la imagen de Docker:
Para construir la imagen del frontend, ejecuta el siguiente comando en la raíz del proyecto donde se encuentra el archivo Dockerfile:

```bash
docker build -t grupo-6-frontend:v1.0.0 .
```

2. Levantar el contenedor:
Para levantar el contenedor con Docker Compose, ejecuta el siguiente comando:

```bash
docker-compose up
```

Esto construirá la imagen y ejecutará el contenedor. El servicio estará disponible en el puerto 5173 en tu máquina local, y podrás acceder al frontend en tu navegador en la URL:
http://localhost:5173

3. Parar el contenedor: Para detener el contenedor, puedes ejecutar:

```bash
docker-compose down
```

## Flujo de trabajo
En este proyecto, seguimos la metodología Git Flow para gestionar el desarrollo. A continuación se detallan los principales componentes de nuestro flujo de trabajo:

### Rama Principal (main):

Contiene la versión estable del proyecto que está en producción.

### Rama de Desarrollo (develop):

Se utiliza para integrar nuevas características y mejoras antes de ser fusionadas a la rama principal.

### Ramas de Características (feature/):

Cada nueva funcionalidad se desarrolla en su propia rama, que se crea a partir de develop. Una vez completada, se fusiona de nuevo en develop.

## Contacto
Si tienes alguna pregunta, puedes contactarnos a través
 de:
- Alexandra Pavez
    - GitHub: [alealecami](https://github.com/alealecami)
- Antonia Horta
    - GitHub: [antohorta](https://github.com/antohorta)
- Daniela Gajardo
    - GitHub: [dgajardoiglesias](https://github.com/dgajardoiglesias)