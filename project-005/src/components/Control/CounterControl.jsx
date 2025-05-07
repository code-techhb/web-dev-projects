import React from "react";
import "./CounterControl.css";

const CounterControl = ({ value, label, onDecrement, onIncrement }) => {
  return (
    <div className="counterContainer">
      <button
        className="btn"
        onClick={onDecrement}
        aria-label={`Decrease ${label}`}
      >
        -
      </button>
      <p className="actionText">
        {label}: <span className="valueHighlight">{value}</span>
      </p>
      <button
        className="btn"
        onClick={onIncrement}
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  );
};

export default CounterControl;
