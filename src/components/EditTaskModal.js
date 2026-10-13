import React, { useState, useEffect, useRef } from 'react';

export default function EditTaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || '');
  const [checked, setChecked] = useState(task?.checked || false);
  const [priority, setPriority] = useState(task?.priority || 'Medium');

  const dialogRef = useRef(null);
  const titleInputRef = useRef(null);

  const priorities = ['Low', 'Medium', 'High'];

  useEffect(() => {
    // Move focus into the dialog when it opens
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        // Simple focus trap inside the modal
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSave = () => {
    onSave({ ...task, title, checked, priority });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-modal-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="edit-task-modal-title">Edit Task</h2>
        <label htmlFor="edit-task-title">Title</label>
        <input
          id="edit-task-title"
          type="text"
          ref={titleInputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="edit-task-priority">Priority</label>
        <select
          id="edit-task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <label htmlFor="edit-task-checked">
          <input
            id="edit-task-checked"
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          Completed
        </label>
        <div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
