import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList(props) {
  const { dataSource, onCheck, onRemove } = props;

  function renderTaskList() {
    if (dataSource.length === 0) {
      return (<li className="task-list-message" role="status">Não há nenhuma tarefa adicionada!</li>);
    }

    return (
      dataSource.map((item, index) => (
        <TaskItem
          key={item.title || index}
          item={item}
          onRemove={(item) => onRemove(item)}
          onCheck={(item) => onCheck(item)}
        />
      ))
    );
  }

  return (
    <ul className="task-list" aria-label="Lista de tarefas">
      {renderTaskList()}
    </ul>
  );
}
