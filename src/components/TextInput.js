import React from "react";

export default function TextInput(props) {
  const { placeholder, className, value, onChange } = props;
  return (
    <input
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event)}
    />
  );
}