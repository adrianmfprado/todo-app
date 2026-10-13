import { useState, useEffect } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import ExportImportTasks from "../components/ExportImportTasks";

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

function HomePage() {
  const [taskList, setTaskList] = useState(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  function handleAdd(task) {
    const newTask = typeof task === "string" ? { title: task, checked: false } : task;
    setTaskList([...taskList, newTask]);
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

        <AddTask onAdd={handleAdd} />

        <ExportImportTasks tasks={taskList} onImport={handleImport} />

        <section aria-label="Tarefas">
          <TaskList
            dataSource={taskList}
            onCheck={(item) => {
              const foundItem = taskList.find((taskItem) => taskItem.title === item.title);
              if (foundItem)
                foundItem.checked = !foundItem.checked;

              setTaskList([
                ...taskList
              ]);
            }}
            onRemove={(item) => {
              const foundItem = taskList.findIndex((taskItem) => taskItem.title === item.title);
              if (foundItem >= 0) {
                taskList.splice(foundItem, 1);
              }

              setTaskList([
                ...taskList
              ]);
            }}
          />
        </section>
      </main>

    </div>
  );
}

export default HomePage;
