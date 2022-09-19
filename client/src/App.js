import { useEffect, useState } from "react";
import "./App.css";
import GetImage from "./requests/GetImage";
import GetQuote from "./requests/GetQuote";
import GetTime from "./requests/GetTime";
import GetWeather from "./requests/GetWeather";

function App() {
  // Set up state for daily image, quote and weather data. And set up reference to current date
  const [image, setImage] = useState(
    localStorage.getItem("image") &&
      localStorage.getItem("image") !== "undefined"
      ? JSON.parse(localStorage.getItem("image"))
      : null
  );
  const [quote, setQuote] = useState(
    localStorage.getItem("quote") &&
      localStorage.getItem("quote") !== "undefined"
      ? JSON.parse(localStorage.getItem("quote"))
      : null
  );

  const [weather, setWeather] = useState({});

  let today = new Date();
  const currDate = {
    day: today.getDay(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };

  // If new data is needed b/c new day or no data stored, fetch new image & quote
  if (getNewData()) {
    async function fetchData() {
      if (!image || image === "undefined") {
        const imageData = await GetImage();
        setImage(imageData);
      }
      if (!quote || quote === "undefined") {
        const quoteData = await GetQuote();
        setQuote(quoteData);
      }
    }
    fetchData();
    localStorage.setItem("lastDay", new Date());
  }

  // On every first render fetch new weather data
  useEffect(() => {
    var lat, lon;
    // obtain latitude and longitude from geolocation if able to... if not set to new york
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (data) => {
          lat = data.coords.latitude;
          lon = data.coords.longitude;
          setWeather(await GetWeather(lat, lon));
        },
        async () => {
          console.log("Location access denied");
          lat = 40.7128;
          lon = -74.006;
          setWeather(await GetWeather(lat, lon));
        }
      );
    }
  }, []);

  // helper function to test if new data is needed
  function getNewData() {
    let storedDate = new Date(localStorage.getItem("lastDay"));
    return (
      currDate.day !== storedDate.getDay() ||
      currDate.month !== storedDate.getMonth() ||
      currDate.year !== storedDate.getFullYear() ||
      !localStorage.getItem("image") ||
      localStorage.getItem("image") === "undefined" ||
      !localStorage.getItem("quote") ||
      localStorage.getItem("quote") === "undefined"
    );
  }

  return (
    <div className="App">
      {!image || image === "undefined" ? (
        <h2>Loading...</h2>
      ) : (
        <div
          style={{
            backgroundImage: `url(${image.urls.regular})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "0px",
          }}
          className="container h-screen"
        >
          {weather && (
            <div className="top-row">
              <div className="top-left">My Clone</div>
              <div className="top-right">
                <div>{weather.temp}°F</div>
                <span className="city">{weather.city}</span>
              </div>
            </div>
          )}

          <div className="above-main"></div>
          <div className="main">
            <GetTime />
          </div>
          <div className="below-main">
            <h3 id="question">What is your main focus for today?</h3>
            <input
              type="text"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "3px solid white",
              }}
            ></input>
            {quote && (
              <div className="quote bottom-center small-screen">
                <div id="quote">{`"${quote.quoteText}"`}</div>
                <div id="author">{quote.quoteAuthor}</div>
              </div>
            )}
          </div>
          <div className="bottom-row">
            <div className="photoInfo bottom-left">
              <div className="photo-location">{image.user.location}</div>
              <a href={image.links.html} target="_blank" rel="noreferrer">
                <div id="photographer">{image.user.name} / Unsplash</div>
              </a>
              <div></div>
            </div>
            {quote && (
              <div className="quote bottom-center large-screen">
                <div id="quote">{`"${quote.quoteText}"`}</div>
                <div id="author">{quote.quoteAuthor}</div>
              </div>
            )}
            <div className="bottom-right">
              <div id="todo">To Do</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
