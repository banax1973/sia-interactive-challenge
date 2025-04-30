import fetch from 'node-fetch';

export const sendTemperature = async (io, latitude, longitude) => {
  try {
    const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    if (resp) {
      const data = await resp.json();
      if (data.current_weather && data.current_weather.temperature !== undefined) {
        const temp = `${data.current_weather.temperature} °C`;
        io.emit('temperature-update', temp);
      }
    }
  } catch (err) {
    console.error('Error al obtener temperatura:', err);
  }
}