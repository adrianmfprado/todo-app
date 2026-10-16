import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList(props) {
  const { dataSource, onCheck, onRemove, onSubtaskToggle, onSubtaskAdd, onSubtaskRemove, emptyMessage, searchTerm } = props;

  function renderTaskList() {
    if (dataSource.length === 0) {
      return (<div className="task-list-message">{emptyMessage || 'Não há nenhuma tarefa adicionada!'}</div>);
    }

    return (
      dataSource.map((item) => (
        <TaskItem
          key={item.id}
          item={item}
          searchTerm={searchTerm}
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
    <div className="task-list">
      {renderTaskList()}
    </div>
  );
}
