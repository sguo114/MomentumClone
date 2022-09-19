import React, { useEffect, useState } from "react";

export default function GetTime() {
  // initiate time to be user current time
  const [time, setTime] = useState(new Date());
  const [guest, setGuest] = useState("Guest");

  // update time every second using setInterval
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <h1 id="time">
        {time
          .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
          .replace(/AM|PM/, "")}
      </h1>

      {time.getHours() > 4 && time.getHours() <= 11 ? (
        <h2 id="greeting">Good Morning, {guest}</h2>
      ) : time.getHours() > 11 && time.getHours() <= 16 ? (
        <h2 id="greeting">Good Afternoon, {guest}</h2>
      ) : (
        <h2 id="greeting">Good Evening, {guest}</h2>
      )}
    </div>
  );
}
