import React from "react";

import trashIcon from '../assets/trash.png'

export default function TaskItem(props) {
  const { item, onCheck, onRemove } = props;

  return (
    <li className="task-list-item">
      <input
        checked={item.checked}
        className="task-list-item-checkbox"
        type="checkbox"
        aria-label={`Marcar tarefa "${item.title}" como ${item.checked ? 'não concluída' : 'concluída'}`}
        onChange={() => onCheck(item)}
      />
      <div className="task-list-item-title">{item.title}</div>
      <button
        className="task-list-item-btn"
        type="button"
        aria-label={`Remover tarefa "${item.title}"`}
        onClick={() => onRemove(item)}
      >
        <img src={trashIcon} alt="" aria-hidden="true" />
      </button>
    </li>
  );
}
