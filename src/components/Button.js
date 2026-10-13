import React from "react";

export default function Button(props) {
  const { text, onClick, className, ariaLabel } = props;

  return (
    <button
      type="button"
      className={`btn ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
