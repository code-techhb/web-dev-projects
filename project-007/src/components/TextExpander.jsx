import { useState } from "react";
import "../index.css";
import PropTypes from "prop-types";

const TextExpander = ({
  children,
  className = "box",
  collapsedNumWords = 20,
  collapsed = true,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#667eea",
  animationDuration = 300,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = async () => {
    setIsAnimating(true);
    setIsCollapsed((prev) => !prev);

    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  const displayText = () => {
    const words = children.split(" ");
    if (isCollapsed && words.length > collapsedNumWords) {
      return words.slice(0, collapsedNumWords).join(" ") + "...";
    }
    return children;
  };

  const btnStyle = {
    background: `linear-gradient(135deg, ${buttonColor} 0%, ${buttonColor}dd 100%)`,
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: isAnimating ? "wait" : "pointer",
    marginLeft: "12px",
    transition: "all 0.2s ease",
    boxShadow: `0 2px 8px ${buttonColor}30`,
    opacity: isAnimating ? 0.7 : 1,
  };

  const textStyle = {
    transition: `opacity ${animationDuration}ms ease`,
    opacity: isAnimating ? 0.8 : 1,
  };

  return (
    <div className={className}>
      <span style={textStyle}>{displayText()}</span>
      <button
        style={btnStyle}
        onClick={handleToggle}
        disabled={isAnimating}
        onMouseEnter={(e) => {
          if (!isAnimating) {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = `0 4px 12px ${buttonColor}40`;
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = `0 2px 8px ${buttonColor}30`;
        }}
      >
        {isCollapsed ? expandButtonText : collapseButtonText}
      </button>
    </div>
  );
};

export default TextExpander;

TextExpander.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  collapsedNumWords: PropTypes.number,
  collapsed: PropTypes.bool,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  animationDuration: PropTypes.number,
};
