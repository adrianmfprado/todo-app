import React,{ useState } from "react";
import TaskItem from "./TaskItem";
import { sortByPriority } from "../utils/priority";

export default function TaskList(props) {
  const { dataSource,onCheck,onRemove,onSubtaskToggle,onSubtaskAdd,onSubtaskRemove,emptyMessage,searchTerm } = props;
  const [sortMode,setSortMode] = useState("none");

  const visibleTasks = sortMode === "priority" ? sortByPriority(dataSource) : dataSource;

  function renderTaskList() {
    if (visibleTasks.length === 0) {
      return (<div className="task-list-message">{emptyMessage || 'Não há nenhuma tarefa adicionada!'}</div>);
    }

    return (
      visibleTasks.map((item) => (
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
      <select className="priority-sort-select" aria-label="Ordenar tarefas por prioridade" value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
        <option value="none">Ordem padrão</option>
        <option value="priority">Prioridade (alta primeiro)</option>
      </select>
      {renderTaskList()}
    </div>
  );
}
