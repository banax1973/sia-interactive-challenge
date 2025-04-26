import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fetch from 'node-fetch';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.SERVER_PORT || 3000;
const LATITUDE = process.env.LATITUDE;
const LONGITUDE = process.env.LONGITUDE;
const TEMPERATURE_INTERVAL = process.env.TEMPERATURE_INTERVAL;

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

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export { app, server, temperatureInterval, sendTemperature, io };