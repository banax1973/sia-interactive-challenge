# SIA Interactive Challenge

Esta aplicación permite a todos los clientes conectados mediante WebSockets reproducir o pausar un video sincronizado, y muestra la temperatura actual de una ciudad usando la API gratuita de Open-Meteo.

# Features:
- Implementa diseño responsivo 
- Permite a los usuarios pausar y adelantar/retroceder la reproducción del video +/- 1 segundo 
- Usa ES6+ y transpila a ES5

## Requisitos
- Node.js >=14.20.0
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
```
## Ejecución
```bash
# Ejecutar la aplicación
npm start

# Ejecutar tests unitarios
npm test

# Ejecutar tests E2E
Nota: si no esta corriendo ya, se debe correr primeramente el server para poder ejecutar tests E2E (npm start).
# Opcion 1: interfaz interactiva
npm run cypress:open
# Opcion 2: Ejecutar tests headless
npm run cypress:run