import React, { useState } from "react";

import trashIcon from '../assets/trash.png';
import SubtaskList from './SubtaskList';

export default function TaskItem(props) {
  const { item, onCheck, onRemove, onSubtaskToggle, onSubtaskAdd, onSubtaskRemove } = props;
  const isOverdue = !item.checked && item.dueDate && new Date() > new Date(item.dueDate);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const subtasks = item.subtasks || [];
  const doneCount = subtasks.filter(function (s) { return s.done; }).length;
  const total = subtasks.length;

  return (
    <li className={`task-list-item ${isOverdue ? 'overdue' : ''}`}>
      <input
        checked={item.checked}
        className="task-list-item-checkbox"
        type="checkbox"
        aria-label={`Marcar tarefa "${item.title}" como ${item.checked ? 'não concluída' : 'concluída'}`}
        onChange={() => onCheck(item)}
      />
      <div className="task-list-item-title">{item.title}</div>
      {item.dueDate && <div className="task-list-item-due">{item.dueDate}</div>}
      {isOverdue && <span className="overdue-badge">Atrasada</span>}
      {total > 0 && (
        <span className="subtask-badge">
          {doneCount}/{total}
        </span>
      )}
      <button
        type="button"
        className="task-list-item-btn subtask-toggle"
        aria-label="Toggle subtasks"
        onClick={() => setShowSubtasks(!showSubtasks)}
      >
        {showSubtasks ? '▾' : '▸'}
      </button>
      <button
        className="task-list-item-btn"
        type="button"
        aria-label={`Remover tarefa "${item.title}"`}
        onClick={() => onRemove(item)}
      >
        <img src={trashIcon} alt="" aria-hidden="true" />
      </button>
      {showSubtasks && (
        <div className="task-subtasks-panel">
          <SubtaskList
            subtasks={subtasks}
            onToggle={(subtaskId) => onSubtaskToggle(item.id, subtaskId)}
            onAdd={(text) => onSubtaskAdd(item.id, text)}
            onRemove={(subtaskId) => onSubtaskRemove(item.id, subtaskId)}
          />
        </div>
      )}
    </li>
  );
}
