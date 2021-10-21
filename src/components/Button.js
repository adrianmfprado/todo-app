import React from "react";

export default function Button(props) {
  const { text, onClick, className } = props;

  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}