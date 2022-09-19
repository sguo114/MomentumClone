// api fetch to open weather map for weather data- data retrieved is temp and city name
export default async function GetWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );
  const data = await response.json();
  console.log(data);
  return { temp: Math.round(data.main.temp, 2), city: data.name };
}
