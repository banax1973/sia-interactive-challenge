const socket = io();
const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const tempDisplay = document.getElementById('tempDisplay');

playBtn.addEventListener('click', () => {
  socket.emit('video-control', 'play');
});

pauseBtn.addEventListener('click', () => {
  socket.emit('video-control', 'pause');
});

socket.on('video-control', (action) => {
  if (action === 'play') video.play();
  else if (action === 'pause') video.pause();
});

socket.on('temperature-update', (temp) => {
  tempDisplay.textContent = temp;
});