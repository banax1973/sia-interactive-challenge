# SIA Interactive Challenge

Esta aplicación permite a todos los clientes conectados mediante WebSockets reproducir o pausar un video sincronizado, y muestra la temperatura actual de una ciudad usando la API gratuita de Open-Meteo.

## Requisitos
- Node.js >=16
- npm

## Instalación
```bash
# Clonar el repositorio
git clone <URL_DEL_REPO>
cd sia-interactive-challenge

# Instalar dependencias
npm install

# Transpilar código cliente a ES5
npm run build

# Ejecutar la aplicación
npm start

# Ejecutar tests unitarios
npm test

# Ejecutar tests E2E
# Abrir la interfaz interactiva
npm run cypress:open
# Ejecutar tests de forma headless
npm run cypress:run