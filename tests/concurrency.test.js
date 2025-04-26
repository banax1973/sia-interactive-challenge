import { io as Client } from 'socket.io-client';
import { server, temperatureInterval, io } from '../server.js';

describe('Concurrency (socket.io)', () => {
  let client1, client2;
  const port = process.env.SERVER_PORT || 3000;
  const url = `http://localhost:${port}`;

  beforeAll((done) => {
    client1 = Client(url);
    client2 = Client(url);

    let connected = 0;
    [client1, client2].forEach(c => {
      c.on('connect', () => {
        if (++connected === 2) done();
      });
    });
  });

  afterAll((done) => {
    client1.disconnect();
    client2.disconnect();
    clearInterval(temperatureInterval);
    io.close(); 
    server.close(done);
  });

  afterEach(() => {
    client1.removeAllListeners('video-control');
    client2.removeAllListeners('video-control');
  });

  test('clients receive "pause" broadcast', (done) => {
    client2.once('video-control', action => {
      expect(action).toBe('pause');
      done();
    });
    client1.emit('video-control', 'pause');
  });

  test('clients receive "play" broadcast', (done) => {
    client2.once('video-control', action => {
      expect(action).toBe('play');
      done();
    });
    client1.emit('video-control', 'play');
  });
});