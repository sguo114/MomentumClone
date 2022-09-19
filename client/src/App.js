import { useEffect, useState } from "react";
import "./App.css";
import GetImage from "./requests/GetImage";
import GetQuote from "./requests/GetQuote";
import GetTime from "./requests/GetTime";
import GetWeather from "./requests/GetWeather";

function App() {
  let today = new Date();

  const [image, setImage] = useState();
  const [quote, setQuote] = useState();
  const [temp, setTemp] = useState(25);
  const [loading, setLoading] = useState(true);
  const [currDate, setCurrDate] = useState({
    day: today.getDay(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  console.log("start", image, quote, currDate);

  useEffect(() => {
    let storedDate = new Date(localStorage.getItem("lastDay"));
    if (
      currDate.day !== storedDate.getDay() ||
      currDate.month !== storedDate.getMonth() ||
      currDate.year !== storedDate.getFullYear() ||
      !localStorage.getItem("image") ||
      !localStorage.getItem("quote")
    ) {
      console.log("if", image, quote);
      GetImage()
        .then((res) => {
          console.log("inside Img", res);
          return res;
        })
        .then((imgData) => {
          console.log("second then img", imgData);
          setImage(imgData);
          localStorage.setItem("image", imgData);
          console.log("after set img", image);
        });

      GetQuote()
        .then((res) => {
          console.log("inside quote", res);
          return res;
        })
        .then((quoteData) => {
          setQuote(quoteData);
          localStorage.setItem("quote", JSON.stringify(quoteData));
          setLoading(false);
          console.log("after check quote", quote);
        });

      localStorage.setItem("lastDay", new Date());
    } else if (!image || !quote) {
      console.log("else if", image, quote);
      setImage(JSON.parse(localStorage.getItem("image")));
      setQuote(JSON.parse(localStorage.getItem("quote")));

      console.log("else if", image, quote);
      setLoading(false);
    } else {
      console.log("else");
      setLoading(false);
      return;
    }
  }, []);
  let x = GetWeather();
  console.log(x);
  console.log(image, quote, image ? true : false);

  return (
    <div className="App">
      {loading ? (
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
          {temp && (
            <div className="top-row">
              <div className="top-left">Links</div>
              <div className="top-right">{temp}°F</div>
            </div>
          )}

          <div className="above-main"></div>
          <div className="main">
            <h1 id="time">
              <GetTime />
            </h1>
            <h2 id="greeting">Good Evening, Sam</h2>
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
              <div id="photographer">{image.user.name}</div>
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
