import request from 'supertest';
import fetch from 'node-fetch';
import { app, io, shutdown } from '../src/app/server.js';
import { sendTemperature } from '../src/services/temperatureService.js';

const TEMP_MOCK = 22;
const LATITUDE_MOCK = 1; 
const LONGITUDE_MOCK = 2;
jest.mock('node-fetch');

afterAll(async () => {
  await shutdown();
});

describe('GET /', () => {
  test('should serve the index HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  test('HTML should contain video element', async () => {
    const res = await request(app).get('/');
    expect(res.text).toMatch(/<video id="video"/);
  });

  test('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/no-such-route');
    expect(res.statusCode).toBe(404);
  });
});

describe('Static assets', () => {
  test('should serve CSS', async () => {
    const res = await request(app).get('/css/styles.css');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/css/);
  });

  test('should serve compiled JS', async () => {
    const res = await request(app).get('/js-compiled/client.js');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/javascript/);
  });
});

describe('Send temperature', () => {
  test('should emit temperature-update when current_weather present', async () => {
    fetch.mockResolvedValue({ json: async () => ({ current_weather: { temperature: TEMP_MOCK } }) });
    const emitSpy = jest.spyOn(io, 'emit');

    await sendTemperature(io, LATITUDE_MOCK, LONGITUDE_MOCK);

    expect(emitSpy).toHaveBeenCalledWith('temperature-update', `${TEMP_MOCK} °C`);
    emitSpy.mockRestore();
  });

  test('should not emit temperature-update if no temperature data', async () => {
    fetch.mockResolvedValue({ json: async () => ({}) });
    const emitSpy = jest.spyOn(io, 'emit');

    await sendTemperature(io, LATITUDE_MOCK, LONGITUDE_MOCK);

    expect(emitSpy).not.toHaveBeenCalledWith('temperature-update', expect.anything());
    emitSpy.mockRestore();
  });
});