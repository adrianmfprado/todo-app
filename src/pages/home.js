import { useState, useEffect } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import CategorySelect from "../components/CategorySelect";
import ExportImportTasks from "../components/ExportImportTasks";
import { createNextInstance } from "../utils/recurrence";

const STORAGE_KEY = "todo-app:tasks";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toLocalDateString(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isToday(dueDate) {
  if (!dueDate) return false;
  return dueDate === toLocalDateString(new Date());
}

function isThisWeek(dueDate) {
  if (!dueDate) return false;
  const today = new Date();
  const inSevenDays = new Date();
  inSevenDays.setDate(today.getDate() + 7);
  return dueDate >= toLocalDateString(today) && dueDate <= toLocalDateString(inSevenDays);
}

function HomePage() {
  const [taskList, setTaskList] = useState(loadTasks);
  const [view, setView] = useState('all');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const viewTasks = view === 'today'
    ? taskList.filter((task) => isToday(task.dueDate))
    : view === 'week'
      ? taskList.filter((task) => isThisWeek(task.dueDate))
      : taskList;

  const filteredTasks = filterCategory === 'All' ? viewTasks : viewTasks.filter(t => t.category === filterCategory);

  const emptyMessage = view === 'today'
    ? 'Nenhuma tarefa vence hoje!'
    : view === 'week'
      ? 'Nenhuma tarefa vence nos próximos 7 dias!'
      : 'Não há nenhuma tarefa adicionada!';

  const updateTask = (taskId, updater) => {
    setTaskList(taskList.map((task) =>
      task.id === taskId ? updater(task) : task
    ));
  };

  const handleSubtaskToggle = (taskId, subtaskId) => {
    updateTask(taskId, (task) => ({
      ...task,
      subtasks: (task.subtasks || []).map((s) =>
        s.id === subtaskId ? { ...s, done: !s.done } : s
      ),
    }));
  };

  const handleSubtaskAdd = (taskId, text) => {
    updateTask(taskId, (task) => ({
      ...task,
      subtasks: [
        ...(task.subtasks || []),
        { id: Date.now(), text, done: false },
      ],
    }));
  };

  const handleSubtaskRemove = (taskId, subtaskId) => {
    updateTask(taskId, (task) => ({
      ...task,
      subtasks: (task.subtasks || []).filter((s) => s.id !== subtaskId),
    }));
  };

  function handleAdd(task) {
    const newTask = typeof task === "string" ? { title: task, checked: false } : task;
    setTaskList([
      ...taskList,
      { ...newTask, id: Date.now(), subtasks: [] }
    ]);
  }

  function handleImport(importedTasks) {
    const normalized = importedTasks.map((task) => ({
      checked: false,
      ...task,
    }));
    setTaskList(normalized);
  }

  return (
    <div className="App">
      <main className="container">
        <h1>React ToDo</h1>

        <div className="view-filter" role="tablist" aria-label="Filtro de visualização">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'all'}
            className={view === 'all' ? 'view-filter-btn active' : 'view-filter-btn'}
            onClick={() => setView('all')}
          >
            Todas
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'today'}
            className={view === 'today' ? 'view-filter-btn active' : 'view-filter-btn'}
            onClick={() => setView('today')}
          >
            Hoje
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'week'}
            className={view === 'week' ? 'view-filter-btn active' : 'view-filter-btn'}
            onClick={() => setView('week')}
          >
            Esta semana
          </button>
        </div>

        <AddTask onAdd={handleAdd} />

        <div className="filter-section">
          <label>Filter by Category: </label>
          <CategorySelect value={filterCategory} onChange={setFilterCategory} />
        </div>

        <section aria-label="Tarefas">
          <TaskList
            dataSource={filteredTasks}
            emptyMessage={emptyMessage}
            onCheck={(task) => {
              updateTask(task.id, (t) => {
                const updated = { ...t, checked: !t.checked };
                if (updated.checked && updated.recurrence && updated.recurrence !== 'none') {
                  const next = createNextInstance(updated, new Date());
                  if (next) {
                    setTaskList((prev) => [...prev, next]);
                  }
                }
                return updated;
              });
            }}
            onRemove={(task) => {
              setTaskList(taskList.filter((t) => t.id !== task.id));
            }}
            onSubtaskToggle={handleSubtaskToggle}
            onSubtaskAdd={handleSubtaskAdd}
            onSubtaskRemove={handleSubtaskRemove}
          />
        </section>

        <ExportImportTasks tasks={taskList} onImport={handleImport} />
      </main>
    </div>
  );
}

export default HomePage;
