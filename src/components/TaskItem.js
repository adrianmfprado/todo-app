import React from "react";

import trashIcon from '../assets/trash.png';

export default function TaskItem(props) {
  const { item, onCheck, onRemove } = props;
  const isOverdue = item.dueDate && new Date() > new Date(item.dueDate);

  return (
    <div className={`task-list-item ${isOverdue ? 'overdue' : ''}`}>
      <input
        checked={item.checked}
        className="task-list-item-checkbox"
        type="checkbox"
        onChange={() => onCheck(item)}
      />
      <div className="task-list-item-title">{item.title}</div>
      {item.dueDate && <div className="task-list-item-due">{item.dueDate}</div>}
      <button className="task-list-item-btn" onClick={() => onRemove(item)}>
        <img src={trashIcon} alt="remove task" />
      </button>
    </div>
  );
}
