import React from "react";

const SkillBtn = (props) => {
  return (
    <button style={{ backgroundColor: props.color }} className="btn">
      {props.skill} <span>{props.emoji}</span>
    </button>
  );
};

export default SkillBtn;
