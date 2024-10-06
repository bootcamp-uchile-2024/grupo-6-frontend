# Páginas Selectas / Frontend

## Descripción
Páginas Selectas es un eCommerce B2C diseñado para ofrecer una experiencia de compra única de libros. Nuestro objetivo es facilitar la exploración y adquisición de una amplia variedad de títulos a través de un sistema de recomendaciones personalizadas basado en los gustos de los usuarios. En el futuro, planeamos introducir funciones adicionales, como el intercambio de libros y la venta de mystery boxes que incluirán selecciones curadas de libros y artículos literarios.

Este proyecto de frontend, desarrollado con React, TypeScript y Vite, se centra en crear una interfaz atractiva y fácil de usar que fomente una comunidad de lectores y mejore su experiencia de compra.

 ## Contenidos
 1. [Tecnologías utilizadas](#Tecnologías-utilizadas)
 2. [Requisitos previos](#Requisitos-previos)
 3. [Instalación](#Instalación)
 4. [Configuración](#Configuración)
 5. [Levantar el Proyecto](#Levantar-el-Proyecto)
 6. [Flujo de trabajo](#Flujo-de-trabajo)
 7. [Contacto](#Contacto)

## Tecnologías usadas
- **React**
- **React Router**
- **Redux**
- **TypeScript**
- **Vite**

## Requisitos previos

## Instalación

## Configuración

Información sobre archivos de configuración (por ejemplo, .env si se necesita).
Variables de entorno necesarias (si aplica).

## Levantar el Proyecto

## Flujo de trabajo
En este proyecto, seguimos la metodología Git Flow para gestionar el desarrollo. A continuación se detallan los principales componentes de nuestro flujo de trabajo:

### Rama Principal (main):

Contiene la versión estable del proyecto que está en producción.

### Rama de Desarrollo (develop):

Se utiliza para integrar nuevas características y mejoras antes de ser fusionadas a la rama principal.

### Ramas de Características (feature/):

Cada nueva funcionalidad se desarrolla en su propia rama, que se crea a partir de develop. Una vez completada, se fusiona de nuevo en develop.

### Ramas de Corrección de Errores (hotfix/):

Se utilizan para realizar correcciones urgentes en la rama principal. Después de resolver el problema, se fusiona tanto en main como en develop.

### Ramas de Lanzamiento (release/):

Se crean para preparar una nueva versión de producción. Permiten realizar pruebas y ajustes antes de fusionar los cambios en main.

## Contacto
Si tienes alguna pregunta, puedes contactarnos a través
 de:
- Alexandra Pavez
    - GitHub: [alealecami](https://github.com/alealecami)
- Antonia Horta
    - GitHub: [antohorta](https://github.com/antohorta)
- Daniela Gajardo
    - GitHub: [dgajardoiglesias](https://github.com/dgajardoiglesias)




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
