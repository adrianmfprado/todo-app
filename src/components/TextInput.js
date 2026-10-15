import React from "react";

export default function TextInput(props) {
  const { placeholder, className, value, onChange, id, ...rest } = props;
  return (
    <input
      id={id}
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event)}
      {...rest}
    />
  );
}