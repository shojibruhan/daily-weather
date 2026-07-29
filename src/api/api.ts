const API_KEY = import.meta.env.VITE_API_KEY;

const getWeather = async ({ lat, lon }: { lat: number; lon: number }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`,
  );

  const data = await response.json();

  return data;
};

export default getWeather;

// `https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}`
// `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`,
