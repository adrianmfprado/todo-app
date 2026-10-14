import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList(props) {
  const { dataSource, onCheck, onRemove, onSubtaskToggle, onSubtaskAdd, onSubtaskRemove, emptyMessage } = props;

  function renderTaskList() {
    if (dataSource.length === 0) {
      return (<li className="task-list-message" role="status">{emptyMessage || 'Não há nenhuma tarefa adicionada!'}</li>);
    }

    return (
      dataSource.map((item, index) => (
        <TaskItem
          key={item.id || item.title || index}
          item={item}
          onRemove={(item) => onRemove(item)}
          onCheck={(item) => onCheck(item)}
          onSubtaskToggle={onSubtaskToggle}
          onSubtaskAdd={onSubtaskAdd}
          onSubtaskRemove={onSubtaskRemove}
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
