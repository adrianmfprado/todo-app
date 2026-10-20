import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { sortByPriority } from "../utils/priority";

export default function TaskList(props) {
  const { dataSource,onCheck,onRemove,onSubtaskToggle,onSubtaskAdd,onSubtaskRemove,emptyMessage,searchTerm,onReorder } = props;
  const [sortMode,setSortMode] = useState("none");
  const [dragId,setDragId] = useState(null);
  const [dragOverId,setDragOverId] = useState(null);

  const visibleTasks = sortMode === "priority" ? sortByPriority(dataSource) : dataSource;
  const dragEnabled = sortMode !== "priority" && typeof onReorder === "function";

  function handleDrop(targetId) {
    if (dragId && dragId !== targetId && typeof onReorder === "function") {
      onReorder(dragId, targetId);
    }
    setDragId(null);
    setDragOverId(null);
  }

  function renderTaskList() {
    if (visibleTasks.length === 0) {
      return (<div className="task-list-message">{emptyMessage || 'Não há nenhuma tarefa adicionada!'}</div>);
    }

    return (
      visibleTasks.map((item) => (
        <div
          key={item.id}
          className={"task-list-item-wrapper" + (dragOverId === item.id ? " drag-over" : "")}
          draggable={dragEnabled}
          onDragStart={dragEnabled ? () => setDragId(item.id) : undefined}
          onDragOver={dragEnabled ? (e) => { e.preventDefault(); setDragOverId(item.id); } : undefined}
          onDragLeave={dragEnabled ? () => setDragOverId(null) : undefined}
          onDrop={dragEnabled ? (e) => { e.preventDefault(); handleDrop(item.id); } : undefined}
          onDragEnd={() => { setDragId(null); setDragOverId(null); }}
        >
          <TaskItem
            item={item}
            searchTerm={searchTerm}
            onRemove={(item) => onRemove(item)}
            onCheck={(item) => onCheck(item)}
            onSubtaskToggle={onSubtaskToggle}
            onSubtaskAdd={onSubtaskAdd}
            onSubtaskRemove={onSubtaskRemove}
          />
        </div>
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