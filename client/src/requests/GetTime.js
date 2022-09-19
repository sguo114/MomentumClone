import React, { useEffect, useState } from "react";

export default function GetTime() {
  // initiate time to be user current time
  const [time, setTime] = useState(new Date());

  // update time every second using setInterval
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  return (
    <div className="time">
      {time
        .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        .replace(/AM|PM/, "")}
    </div>
  );
}
