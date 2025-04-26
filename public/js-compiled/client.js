"use strict";

var socket = io();
var video = document.getElementById('video');
var playBtn = document.getElementById('playBtn');
var pauseBtn = document.getElementById('pauseBtn');
var tempDisplay = document.getElementById('tempDisplay');
playBtn.addEventListener('click', function () {
  socket.emit('video-control', 'play');
});
pauseBtn.addEventListener('click', function () {
  socket.emit('video-control', 'pause');
});
socket.on('video-control', function (action) {
  if (action === 'play') video.play();else if (action === 'pause') video.pause();
});
socket.on('temperature-update', function (temp) {
  tempDisplay.textContent = temp;
});