"use strict";

var socket = io();
var video = document.getElementById('video');
var playBtn = document.getElementById('playBtn');
var pauseBtn = document.getElementById('pauseBtn');
var forwardBtn = document.getElementById('forwardBtn');
var rewindBtn = document.getElementById('rewindBtn');
var tempDisplay = document.getElementById('tempDisplay');
playBtn.addEventListener('click', function () {
  socket.emit('video-control', 'play');
});
pauseBtn.addEventListener('click', function () {
  socket.emit('video-control', 'pause');
});
forwardBtn.addEventListener('click', function () {
  socket.emit('video-control', 'forward');
});
rewindBtn.addEventListener('click', function () {
  socket.emit('video-control', 'rewind');
});
socket.on('video-control', function (action) {
  if (action === 'play') video.play();else if (action === 'pause') video.pause();else if (action === 'forward') video.currentTime += 1;else if (action === 'rewind') video.currentTime -= 1;
});
socket.on('temperature-update', function (temp) {
  tempDisplay.textContent = temp;
});