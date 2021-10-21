import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList(props) {
  const { dataSource, onCheck, onRemove } = props;

  function renderTaskList() {
    if (dataSource.length === 0) {
      return (<div className="task-list-message">Não há nenhuma tarefa adicionada!</div>);
    }

    return (
      dataSource.map((item) => (
        <TaskItem
          item={item}
          onRemove={(item) => onRemove(item)}
          onCheck={(item) => onCheck(item)}
        />
      ))
    );
  }

  return (
    <div className="task-list">
      {renderTaskList()}
    </div>
  );
}