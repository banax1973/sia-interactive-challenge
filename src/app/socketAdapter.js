let activeUsers = 0;

export const registerSocketHandlers = (io, socket) => {
  activeUsers++;
  console.log(`Cliente conectado: ${socket.id}. (usuarios totales: ${activeUsers})`);

  socket.on('video-control', (action) => {
    io.emit('video-control', action);
  });

  socket.on('disconnect', (reason) => {
    activeUsers--;
    console.log(`Cliente desconectado: ${socket.id}. (razón: ${reason}). (usuarios totales: ${activeUsers})`);
  });
}