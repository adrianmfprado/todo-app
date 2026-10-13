import React, { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

import imageMais from '../assets/plus.png';

export default function AddTask(props) {
  const { onAdd } = props;

  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const priorities = ['Low', 'Medium', 'High'];

  return (
    <div className="add-task" role="group" aria-label="Adicionar nova tarefa">
      <label htmlFor="new-task-title" className="visually-hidden">Título da tarefa</label>
      <TextInput
        id="new-task-title"
        className="task-name-input"
        placeholder="digite o título da tarefa..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <label htmlFor="new-task-priority" className="visually-hidden">Prioridade</label>
      <select
        id="new-task-priority"
        className="task-priority-select"
        aria-label="Prioridade da tarefa"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        {priorities.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <Button
        className="add"
        text={(
          <span><img src={imageMais} alt="" aria-hidden="true" /> adicionar tarefa</span>
        )}
        onClick={() => onAdd({ title: taskTitle, checked: false, priority })}
      />
    </div>
  );
}
