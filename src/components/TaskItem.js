import React, { useState } from "react";

import trashIcon from '../assets/trash.png';
import SubtaskList from './SubtaskList';
import { isValidPriority, getPriorityLabel } from '../utils/priority';

export default function TaskItem(props) {
  const { item, onCheck, onRemove, onSubtaskToggle, onSubtaskAdd, onSubtaskRemove } = props;
  const isOverdue = !item.checked && item.dueDate && new Date() > new Date(item.dueDate);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const subtasks = item.subtasks || [];
  const doneCount = subtasks.filter(function (s) { return s.done; }).length;
  const total = subtasks.length;

  return (
    <div className={`task-list-item ${isOverdue ? 'overdue' : ''}`}>
      <input
        checked={item.checked}
        className="task-list-item-checkbox"
        type="checkbox"
        onChange={() => onCheck(item)}
      />
      <div className="task-list-item-title">{item.title}</div>
      {isValidPriority(item.priority) && (
        <span className={`task-priority-badge task-priority-${item.priority}`}>
          {getPriorityLabel(item.priority)}
        </span>
      )}
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
      <button className="task-list-item-btn" onClick={() => onRemove(item)}>
        <img src={trashIcon} alt="remove task" />
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
    </div>
  );
}
