import React from "react";
import SkillBtn from "./SkillBtn";

const Bio = () => {
  const skillSet = [
    { id: 1, skill: "HTML & CSS", emoji: "🤓", color: " #7a6fb5" },
    { id: 2, skill: "JavaScript", emoji: "⚡", color: "#f3bd75" },
    { id: 3, skill: "React", emoji: "⚛️", color: "#b0c4de" },
    { id: 4, skill: "Git & GitHub", emoji: "🐙", color: "#e460f0" },
    { id: 5, skill: "Responsive Design", emoji: "📱", color: "#42e478" },
    { id: 6, skill: "Problem Solving", emoji: "🧠", color: "#ff5722" },
  ];
  return (
    <div className="intro">
      <p>
        In the quiet stillness of the night, while the world slows down,
        Zafirael lights up her screen with purpose. A passionate and aspiring
        front-end developer, she spends her evenings tucked beneath a soft desk
        lamp, mastering React and breathing life into lines of code. With trees
        swaying gently outside her window and stars shimmering above, Zafirael
        finds both peace and power in her craft. She’s not just building apps —
        she’s building a future.
        <br />
        <br />
        When she’s not coding, she loves stargazing, journaling, and sketching
        ideas for future apps under the calm night sky. <br />
        <br />
        Calm, curious, and endlessly driven, Zafirael’s journey is one of both
        serenity and ambition.
      </p>

      {skillSet.map((skillObj) => {
        return (
          <SkillBtn
            key={skillObj.id}
            skill={skillObj.skill}
            color={skillObj.color}
            emoji={skillObj.emoji}
          />
        );
      })}
      {/* if you don't wanna use return , then you'll use () like below */}
      {/* {skillSet.map((skillObj) => (
        <SkillBtn
          key={skillObj.id}
          skill={skillObj.skill}
          color={skillObj.color}
          emoji={skillObj.emoji}
        />
      ))} */}
    </div>
  );
};

export default Bio;
