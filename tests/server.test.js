import request from 'supertest';
import fetch from 'node-fetch';
import { app, server, temperatureInterval, sendTemperature, io } from '../server.js';

jest.mock('node-fetch');

afterAll((done) => {
  clearInterval(temperatureInterval);
  server.close(done);
});

describe('GET /', () => {
  it('should serve the index HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  it('HTML should contain video element', async () => {
    const res = await request(app).get('/');
    expect(res.text).toMatch(/<video id="video"/);
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/no-such-route');
    expect(res.statusCode).toBe(404);
  });
});

describe('Static assets', () => {
  it('should serve CSS', async () => {
    const res = await request(app).get('/css/styles.css');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/css/);
  });

  it('should serve compiled JS', async () => {
    const res = await request(app).get('/js-compiled/client.js');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/javascript/);
  });
});

describe('sendTemperature', () => {
  it('should emit temperature-update when current_weather present', async () => {
    const mockTemp = 22;
    fetch.mockResolvedValue({ json: async () => ({ current_weather: { temperature: mockTemp } }) });
    const emitSpy = jest.spyOn(io, 'emit');

    await sendTemperature();

    expect(emitSpy).toHaveBeenCalledWith('temperature-update', `${mockTemp} °C`);
    emitSpy.mockRestore();
  });

  it('should not emit temperature-update if no temperature data', async () => {
    fetch.mockResolvedValue({ json: async () => ({}) });
    const emitSpy = jest.spyOn(io, 'emit');

    await sendTemperature();

    expect(emitSpy).not.toHaveBeenCalledWith('temperature-update', expect.anything());
    emitSpy.mockRestore();
  });
});