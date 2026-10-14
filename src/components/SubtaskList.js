import React, { useState } from 'react';

function SubtaskList({ subtasks, onToggle, onAdd, onRemove }) {
  const [newSubtask, setNewSubtask] = useState('');

  const items = subtasks || [];
  const doneCount = items.filter(function (s) { return s.done; }).length;
  const total = items.length;
  const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  function handleAdd(e) {
    e.preventDefault();
    const text = newSubtask.trim();
    if (!text) return;
    onAdd(text);
    setNewSubtask('');
  }

  return (
    <div className="subtask-list">
      <div className="subtask-progress">
        <span className="subtask-progress-label">
          {doneCount}/{total} done
        </span>
        <div className="subtask-progress-bar">
          <div
            className="subtask-progress-fill"
            style={{ width: progress + '%' }}
          />
        </div>
      </div>
      <ul>
        {items.map(function (subtask) {
          return (
            <li key={subtask.id} className={subtask.done ? 'subtask done' : 'subtask'}>
              <label>
                <input
                  type="checkbox"
                  checked={subtask.done}
                  onChange={function () { onToggle(subtask.id); }}
                />
                <span>{subtask.text}</span>
              </label>
              <button
                type="button"
                className="subtask-remove"
                aria-label="Remove subtask"
                onClick={function () { onRemove(subtask.id); }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleAdd} className="subtask-add">
        <input
          type="text"
          placeholder="Add a subtask..."
          value={newSubtask}
          onChange={function (e) { setNewSubtask(e.target.value); }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default SubtaskList;
