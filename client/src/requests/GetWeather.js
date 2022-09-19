export default async function GetWeather() {
  var lat, lon;

  // obtain latitude and longitude from geolocation if able to
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        console.log(data.coords);
        lat = data.coords.latitude;
        lon = data.coords.longitude;
        return getData(lat, lon);
      },
      () => {
        console.log("Location access denied");
        lat = 40.7128;
        lon = -74.006;
        return getData(lat, lon);
      }
    );
  }
  const getData = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  };
}
