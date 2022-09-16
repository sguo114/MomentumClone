import "./App.css";
import GetImage from "./requests/GetImage";

function App() {
  let image = GetImage();
  console.log(image);
  return (
    <div className="App">
      {!image ? (
        <h2>Loading...</h2>
      ) : (
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "0px",
          }}
          className="container h-screen"
        >
          <div className="main">
            <h1 id="time">2:52</h1>
            <h2 id="greeting">Good Evening, Sam</h2>
            <h3 id="question">What is your main focus for today?</h3>
            <input
              type="text"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "3px solid white",
              }}
            ></input>
          </div>

          <div className="quote">
            <div id="quote">This is a quote</div>
            <div id="author">Author</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
