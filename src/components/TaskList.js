import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { sortByPriority } from "../utils/priority";
import { extractTags, countTasksByTag, tasksMatchSelectedTags } from "../utils/tags";

export default function TaskList(props) {
  const { dataSource,onCheck,onRemove,onSubtaskToggle,onSubtaskAdd,onSubtaskRemove,emptyMessage,searchTerm,onReorder,onUpdate } = props;
  const [sortMode,setSortMode] = useState("none");
  const [dragId,setDragId] = useState(null);
  const [dragOverId,setDragOverId] = useState(null);
  const [selectedTags,setSelectedTags] = useState([]);

  const baseTasks = sortMode === "priority" ? sortByPriority(dataSource) : dataSource;
  const visibleTasks = tasksMatchSelectedTags(baseTasks, selectedTags);
  const dragEnabled = sortMode !== "priority" && typeof onReorder === "function";

  function toggleTag(tag) {
    setSelectedTags(function (current) {
      if (current.includes(tag)) {
        return current.filter(function (t) { return t !== tag; });
      }
      return current.concat([tag]);
    });
  }

  function handleDrop(targetId) {
    if (dragId && dragId !== targetId && typeof onReorder === "function") {
      onReorder(dragId, targetId);
    }
    setDragId(null);
    setDragOverId(null);
  }

  function renderTagFilter() {
    const tags = extractTags(dataSource);
    if (tags.length === 0) { return null; }
    const counts = countTasksByTag(dataSource);
    return (
      <div className="tag-filter" role="group" aria-label="Filtrar tarefas por tag">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={"tag-chip" + (selectedTags.includes(tag) ? " active" : "")}
            aria-pressed={selectedTags.includes(tag)}
            aria-label={"Filtrar tarefas por tag " + tag}
            data-testid={"chip-tag-" + tag}
            onClick={() => toggleTag(tag)}
          >
            #{tag} ({counts[tag] || 0})
          </button>
        ))}
      </div>
    );
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
            onUpdate={onUpdate}
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
      {renderTagFilter()}
      {renderTaskList()}
    </div>
  );
}