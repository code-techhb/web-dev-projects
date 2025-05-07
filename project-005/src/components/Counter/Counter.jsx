import React, { useState } from "react";
import "./Counter.css";
import CounterControl from "../Control/CounterControl";

const Counter = () => {
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);

  // Handler functions
  const handlePlus = () => {
    setCounter((prevCounter) => prevCounter + step);
  };

  const handleMinus = () => {
    setCounter((prevCounter) => prevCounter - step);
  };

  const handleStepPlus = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleStepMinus = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  // Date calculations
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate() + counter);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const futureDateString = futureDate.toLocaleDateString("en-US", options);

  // -------------- UI ---------------
  return (
    <>
      <CounterControl
        value={step}
        label="Steps"
        onDecrement={handleStepMinus}
        onIncrement={handleStepPlus}
      />

      <CounterControl
        value={counter}
        label="Counter"
        onDecrement={handleMinus}
        onIncrement={handlePlus}
      />

      <div className="dateDisplay">
        <span>
          <span className="valueHighlight">
            {counter === 0
              ? "Today is:"
              : counter > 0
              ? `${counter} days from today is:`
              : `${Math.abs(counter)} days ago was:`}
          </span>{" "}
          <span className="valueHighlight">{futureDateString}</span>
        </span>
      </div>
    </>
  );
};

export default Counter;
