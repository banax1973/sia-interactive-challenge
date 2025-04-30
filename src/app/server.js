import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PORT,TEMPERATURE_INTERVAL, LATITUDE, LONGITUDE } from '../../config.js';
import { sendTemperature } from '../services/temperatureService.js';
import { registerSocketHandlers } from './socketAdapter.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  registerSocketHandlers(io, socket);
  sendTemperature(io, LATITUDE, LONGITUDE);
});

const temperatureInterval = setInterval(
  () => sendTemperature(io, LATITUDE, LONGITUDE),
  TEMPERATURE_INTERVAL
);

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}

const shutdown = async () => {
  clearInterval(temperatureInterval);
  await new Promise(res => io.close(res));
  await new Promise((res) => server.close(res));
}

export { app, server, temperatureInterval, io, shutdown };