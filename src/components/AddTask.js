import React, { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

import imageMais from '../assets/plus.png';

export default function AddTask(props) {
  const { onAdd } = props;

  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className="add-task">
      <TextInput
        className="task-name-input"
        placeholder="digite o título da tarefa..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <input
        type="date"
        className="task-due-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Button
        className="add"
        text={(
          <span><img src={imageMais} alt="add task" /> adicionar tarefa</span>
        )}
        onClick={() => onAdd({ title: taskTitle, checked: false, dueDate })}
      />
    </div>
  );
}
