import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PORT,TEMPERATURE_INTERVAL, LATITUDE, LONGITUDE } from './config.js';
import { sendTemperature } from './services/temperatureService.js';

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

  sendTemperature(io, LATITUDE, LONGITUDE);
});

const temperatureCallback = () => sendTemperature(io, LATITUDE, LONGITUDE);
const temperatureInterval = setInterval(temperatureCallback, TEMPERATURE_INTERVAL);

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}

export { app, server, temperatureInterval, io };