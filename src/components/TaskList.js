import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList(props) {
<<<<<<< HEAD
  const { dataSource, onCheck, onRemove, emptyMessage } = props;
=======
  const { dataSource, onCheck, onRemove, onSubtaskToggle, onSubtaskAdd, onSubtaskRemove } = props;
>>>>>>> origin/master

  function renderTaskList() {
    if (dataSource.length === 0) {
      return (<div className="task-list-message">{emptyMessage || 'Não há nenhuma tarefa adicionada!'}</div>);
    }

    return (
      dataSource.map((item) => (
        <TaskItem
<<<<<<< HEAD
          key={item.title}
=======
          key={item.id}
>>>>>>> origin/master
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
    <div className="task-list">
      {renderTaskList()}
    </div>
  );
}
