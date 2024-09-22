import React, { useState, useEffect } from "react";
import "./index.css"; // Ensure you have proper CSS for red, yellow, and green lights.

function TrafficSignal() {
  const [activeColor, setActiveColor] = useState("Red"); // Initial light: Red
  const [crossing, setCrossing] = useState(false); // To control when the button is clicked
  const [countdown, setCountdown] = useState(10); // To track countdown time

  useEffect(() => {
    let timer;
    let interval;

    if (crossing) {
      switch (activeColor) {
        case "Red":
          setCountdown(10); // Start 10-second countdown

          interval = setInterval(() => {
            setCountdown((prev) => {
              if (prev > 1) {
                return prev - 1;
              } else {
                clearInterval(interval);
                setActiveColor("Yellow");
                return prev;
              }
            });
          }, 1000);

          // Transition to Yellow light after 10 seconds
          timer = setTimeout(() => {
            setActiveColor("Yellow");
          }, 10000);
          break;

        case "Yellow":
          setCountdown(2); // Start 2-second countdown for Green

          interval = setInterval(() => {
            setCountdown((prev) => {
              if (prev > 1) {
                return prev - 1;
              } else {
                clearInterval(interval);
                setActiveColor("Green");
                return prev;
              }
            });
          }, 1000);

          // Transition to Green light after 2 seconds
          timer = setTimeout(() => {
            setActiveColor("Green");
          }, 2000);
          break;

        case "Green":
          // Green light stays on
          console.log("Green light is on.");
          break;

        default:
          break;
      }
    }

    return () => {
      clearTimeout(timer); // Clear the timeout on unmount or when the effect re-runs
      clearInterval(interval); // Clear the interval when the effect re-runs
    };
  }, [activeColor, crossing]); // Add 'crossing' to the dependency array

  const handleCrossing = () => {
    setCrossing(true); // Start the crossing signal cycle
    setActiveColor("Red"); // Start the signal from Red
  };

  return (
    <div className="traffic-container">
      <div className="traffic-pole">
        <div className={activeColor === "Red" ? "redcolor" : "traffic-light"}></div>
        <div className={activeColor === "Yellow" ? "yellowcolor" : "traffic-light"}></div>
        <div className={activeColor === "Green" ? "greencolor" : "traffic-light"}></div>
      </div>
      <button className="traffic-signal cross" onClick={handleCrossing}>
        Cross Signal
      </button>
      <div className="btn">Countdown:  <span className="span"> {countdown} second(s) </span></div>
    </div>
  );
}

export default TrafficSignal;
