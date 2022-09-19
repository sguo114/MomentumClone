export default async function GetWeather(lat, lon) {
  if (
    localStorage.getItem("temp") &&
    localStorage.getItem("temp") !== "undefined"
  ) {
    return {
      temp: Math.round(localStorage.getItem("temp"), 2),
      city: localStorage.getItem("city"),
    };
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );
  const data = await response.json();
  localStorage.setItem("temp", Math.round(data.main.temp, 2));
  localStorage.setItem("city", data.name);
  console.log(data);
  return { temp: Math.round(data.main.temp, 2), city: data.name };
}
