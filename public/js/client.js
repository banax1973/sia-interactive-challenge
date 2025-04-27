const socket = io();
const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const forwardBtn = document.getElementById('forwardBtn');
const rewindBtn = document.getElementById('rewindBtn');
const tempDisplay = document.getElementById('tempDisplay');

playBtn.addEventListener('click', () => {
  socket.emit('video-control', 'play');
});

pauseBtn.addEventListener('click', () => {
  socket.emit('video-control', 'pause');
});

forwardBtn.addEventListener('click', () => {
  socket.emit('video-control', 'forward');
});

rewindBtn.addEventListener('click', () => {
  socket.emit('video-control', 'rewind');
});

socket.on('video-control', (action) => {
  if (action === 'play') video.play();
  else if (action === 'pause') video.pause();
  else if (action === 'forward') video.currentTime += 1;
  else if (action === 'rewind') video.currentTime -= 1;
});

socket.on('temperature-update', (temp) => {
  tempDisplay.textContent = temp;
});