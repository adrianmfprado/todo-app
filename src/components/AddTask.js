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

  const handleAdd = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      title: taskTitle,
      category,
      checked: false,
      recurrence,
    };
    onAdd(newTask);
    setTaskTitle("");
    setCategory("Personal");
    setRecurrence(RECURRENCE.NONE);
  };

  return (
    <div className="add-task">
      <TextInput
        className="task-name-input"
        placeholder="digite o título da tarefa..."
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />
      <CategorySelect value={category} onChange={setCategory} />
      <select
        className="recurrence-select"
        value={recurrence}
        onChange={(event) => setRecurrence(event.target.value)}
      >
        <option value={RECURRENCE.NONE}>Não repete</option>
        <option value={RECURRENCE.DAILY}>Diária</option>
        <option value={RECURRENCE.WEEKLY}>Semanal</option>
        <option value={RECURRENCE.MONTHLY}>Mensal</option>
      </select>
      <Button
        className="add"
        text={
          <span><img src={imageMais} alt="add task" /> adicionar tarefa</span>
        }
        onClick={handleAdd}
      />
    </div>
  );
}
