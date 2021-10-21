import React, { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

import imageMais from '../assets/plus.png';

export default function AddTask(props) {
  const { onAdd } = props;

  const [taskTitle, setTaskTitle] = useState('texto inicial 2');

  return (
    <div className="add-task">
      <TextInput
        className="task-name-input"
        placeholder="digite o título da tarefa..."
        value={taskTitle}
        onChange={(event) => {
          setTaskTitle(event.target.value);
        }}
      />

      <Button
        className="add"
        text={(
          <span><img src={imageMais} alt="add task" /> adicionar tarefa</span>
        )}
        onClick={() => onAdd(taskTitle)}
      />
    </div>
  );
}