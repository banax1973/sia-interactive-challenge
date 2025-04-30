import { io as Client } from 'socket.io-client';
import { server, shutdown } from '../src/app/server.js';

const CLIENTS_AMOUNT = 2;

describe('Concurrency (socket.io)', () => {
  let client1, client2;
  
  beforeAll(async () => {
    await new Promise(res => server.listen(0, res));
    const port = server.address().port;
    const url = `http://localhost:${port}`;
  
    client1 = Client(url);
    client2 = Client(url);
    // wait to all clients´ sockets are connected
    await new Promise(res => {
      let c = 0;
      [client1, client2].forEach(sock =>
        sock.on('connect', () => ++c === CLIENTS_AMOUNT && res())
      );
    });
  });

  afterAll(async () => {
    client1.disconnect();
    client2.disconnect();
    await shutdown();
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