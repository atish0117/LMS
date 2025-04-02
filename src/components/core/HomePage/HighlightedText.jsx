import React from "react";

const HighlightedText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-green-600 via-green-500 to-green-400 text-green-900 bg-clip-text font-extrabold shadow-md">
      {text}
    </span>
  );
};

export default HighlightedText;