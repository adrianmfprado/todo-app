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
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 500;

  const handleAdd = () => {
    if (!taskTitle.trim()) return;
    if (description.trim() && description.length > MAX_CHARS) return;
    const newTask = {
      title: taskTitle,
      category,
      checked: false,
      recurrence,
      dueDate,
      tags: tags || [],
      description,
    };
    onAdd(newTask);
    setTaskTitle("");
    setCategory("Personal");
    setRecurrence(RECURRENCE.NONE);
    setDueDate("");
    setTags([]);
    setDescription("");
    setCharCount(0);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
    setCharCount(value.length);
  };

  const getColorClass = () => {
    if (charCount === 0) return "";
    if (charCount >= MAX_CHARS) return "error";
    if (charCount >= MAX_CHARS * 0.8) return "warning";
    return "";
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
      <input
        type="date"
        className="task-due-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="tag-input-group">
        <input
          type="text"
          className="tag-input"
          placeholder="Adicionar tags (separadas por vírgula)"
          value={tags.join(', ') || ''}
          onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()).filter(t => t))}
        />
      </div>
      <div className="description-input-group">
        <TextInput
          className="description-input"
          placeholder="descrição da tarefa (até 500 caracteres)"
          value={description}
          onChange={handleDescriptionChange}
        />
        {charCount > 0 && (
          <div className={"char-counter " + getColorClass()}>{"" + charCount + " de " + MAX_CHARS + " caracteres"}</div>
        )}
      </div>
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
