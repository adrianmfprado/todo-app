import React, { useState } from "react";
import trashIcon from '../assets/trash.png';
import SubtaskList from './SubtaskList';
import HighlightText from './HighlightText';
import { isValidPriority, getPriorityLabel } from '../utils/priority';

export default function TaskItem(props) {
  const { item, onCheck, onRemove, onSubtaskToggle, onSubtaskAdd, onSubtaskRemove, searchTerm } = props;
  const isOverdue = !item.checked && item.dueDate && new Date() > new Date(item.dueDate);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const subtasks = item.subtasks || [];
  const doneCount = subtasks.filter(function (s) { return s.done; }).length;
  const total = subtasks.length;

  const q = String(searchTerm || '').trim();
  const active = q.length >= 3;
  const hasDesc = Boolean(item.description && String(item.description).trim());
  const tags = Array.isArray(item.tags) ? item.tags : [];

  return (
    <div className={`task-list-item ${isOverdue ? 'overdue' : ''}`}>
      <input
        checked={item.checked}
        className="task-list-item-checkbox"
        type="checkbox"
        onChange={() => onCheck(item)}
      />
      <div className="task-list-item-title">
        {active ? <HighlightText text={item.title} searchTerm={q} /> : item.title}
      </div>
      {(active && hasDesc) && (
        <div className="task-list-item-description">
          <HighlightText text={item.description} searchTerm={q} />
        </div>
      )}
      {(active && tags.length > 0) && (
        <div className="task-list-item-tags">
          {tags.map((tag) => (
            <span key={tag} className="task-tag">
              <HighlightText text={'#' + tag} searchTerm={q} />
            </span>
          ))}
        </div>
      )}
      {isValidPriority(item.priority) && (
        <span className={`task-priority-badge task-priority-${item.priority}`}>
          {getPriorityLabel(item.priority)}
        </span>
      )}
{item.dueDate&&<div className="task-list-item-due">{item.dueDate}</div>}
      {isOverdue&&<span className="overdue-badge">Atrasada</span>}
      {total>0&&<span className="subtask-badge">{doneCount}/{total}</span>}
      <button type="button" className="task-list-item-btn subtask-toggle" aria-label="Toggle subtasks" onClick={()=>setShowSubtasks(!showSubtasks)}>{showSubtasks?'▾':'▸'}</button>
      <button className="task-list-item-btn" onClick={()=>onRemove(item)}><img src={trashIcon} alt="remove task"/></button>
      {showSubtasks&&(
        <div className="task-subtasks-panel">
          <SubtaskList subtasks={subtasks} onToggle={(sid)=>onSubtaskToggle(item.id,sid)} onAdd={(text)=>onSubtaskAdd(item.id,text)} onRemove={(sid)=>onSubtaskRemove(item.id,sid)}/>
        </div>
      )}
    </div>
  );
}
