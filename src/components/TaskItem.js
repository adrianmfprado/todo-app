import React from "react";

import trashIcon from '../assets/trash.png'

export default function TaskItem(props) {
  const { item, onCheck, onRemove } = props;

  return (
    <div className="task-list-item">
      <input
        checked={item.checked}
        className="task-list-item-checkbox"
        type="checkbox"
        onChange={() => onCheck(item)}
      />
      <div className="task-list-item-title">{item.title}</div>
      <button className="task-list-item-btn" onClick={() => onRemove(item)}>
        <img src={trashIcon} alt="remove task" />
      </button>
    </div>
  );
}