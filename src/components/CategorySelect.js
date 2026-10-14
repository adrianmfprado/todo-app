import React from "react";

const CATEGORIES = ["Personal", "Work", "Shopping", "Health", "Other"];

export default function CategorySelect(props) {
  const { value, onChange } = props;

  return (
    <select
      className="category-select"
      aria-label="Category"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
