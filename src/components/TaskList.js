import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList(props) {
  const { dataSource, onCheck, onRemove, emptyMessage } = props;

  function renderTaskList() {
    if (dataSource.length === 0) {
      return (<div className="task-list-message">{emptyMessage || 'Não há nenhuma tarefa adicionada!'}</div>);
    }

    return (
      dataSource.map((item) => (
        <TaskItem
          key={item.title}
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
