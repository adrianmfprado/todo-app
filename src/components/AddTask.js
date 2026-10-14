import React, { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import CategorySelect from "./CategorySelect";
import { RECURRENCE } from "../utils/recurrence";

import imageMais from '../assets/plus.png';

export default function AddTask(props) {
  const { onAdd } = props;

  const [taskTitle, setTaskTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [recurrence, setRecurrence] = useState(RECURRENCE.NONE);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const priorities = ["Low", "Medium", "High"];

  const handleAdd = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      title: taskTitle,
      category,
      checked: false,
      recurrence,
      dueDate,
      priority,
    };
    onAdd(newTask);
    setTaskTitle("");
    setCategory("Personal");
    setRecurrence(RECURRENCE.NONE);
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <div className="add-task" role="group" aria-label="Adicionar nova tarefa">
      <label htmlFor="new-task-title" className="visually-hidden">Título da tarefa</label>
      <TextInput
        id="new-task-title"
        className="task-name-input"
        placeholder="digite o título da tarefa..."
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />
      <label htmlFor="new-task-category" className="visually-hidden">Categoria</label>
      <CategorySelect value={category} onChange={setCategory} />
      <label htmlFor="new-task-recurrence" className="visually-hidden">Recorrência</label>
      <select
        id="new-task-recurrence"
        className="recurrence-select"
        aria-label="Recorrência da tarefa"
        value={recurrence}
        onChange={(event) => setRecurrence(event.target.value)}
      >
        <option value={RECURRENCE.NONE}>Não repete</option>
        <option value={RECURRENCE.DAILY}>Diária</option>
        <option value={RECURRENCE.WEEKLY}>Semanal</option>
        <option value={RECURRENCE.MONTHLY}>Mensal</option>
      </select>
      <label htmlFor="new-task-due-date" className="visually-hidden">Data de vencimento</label>
      <input
        id="new-task-due-date"
        type="date"
        className="task-due-date"
        aria-label="Data de vencimento da tarefa"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
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
        onClick={handleAdd}
      />
    </div>
  );
}
