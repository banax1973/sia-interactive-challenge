import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fetch from 'node-fetch';
import { PORT, LATITUDE, LONGITUDE, TEMPERATURE_INTERVAL } from './config.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let activeUsers = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  activeUsers++;
  console.log(`Cliente conectado: ${socket.id}. (usuarios totales: ${activeUsers})`);

  socket.on('video-control', (action) => {
    io.emit('video-control', action);
  });

  socket.on('disconnect', (reason) => {
    activeUsers--;
    console.log(`Cliente desconectado: ${socket.id}. (razón: ${reason}). (usuarios totales: ${activeUsers})`);
  });

  sendTemperature();
});

const sendTemperature = async () => {
  try {
    const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true`);
    const data = await resp.json();
    if (data.current_weather && data.current_weather.temperature !== undefined) {
      const temp = `${data.current_weather.temperature} °C`;
      io.emit('temperature-update', temp);
    }
  } catch (err) {
    console.error('Error al obtener temperatura:', err);
  }
}

const temperatureInterval = setInterval(sendTemperature, TEMPERATURE_INTERVAL);

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}

export { app, server, temperatureInterval, sendTemperature, io };