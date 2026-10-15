import { useState, useEffect } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import CategorySelect from "../components/CategorySelect";
import { createNextInstance } from "../utils/recurrence";

const STORAGE_KEY = 'todo-app-tasks';

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTaskList(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const filteredTasks = filterCategory === 'All' ? taskList : taskList.filter(t => t.category === filterCategory);

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

  return (
    <div className="App">
      <div className="container">
        <h1>React ToDo</h1>

        <AddTask
          onAdd={(task) => {
            setTaskList([
              ...taskList,
              { ...task, id: Date.now(), subtasks: [] }
            ]);
          }}
        />

        <div className="filter-section">
          <label>Filter by Category: </label>
          <CategorySelect value={filterCategory} onChange={setFilterCategory} />
        </div>

        <TaskList
          dataSource={filteredTasks}
          onCheck={(item) => {
            const foundItem = taskList.find((taskItem) => taskItem.title === item.title);
            if (foundItem) {
              foundItem.checked = !foundItem.checked;
            }

            if (foundItem && foundItem.checked) {
              const nextInstance = createNextInstance(foundItem, new Date());
              if (nextInstance) {
                setTaskList([...taskList, nextInstance]);
                return;
              }
            }

            setTaskList([...taskList]);
          }}
          onRemove={(item) => {
            const foundItem = taskList.findIndex((taskItem) => taskItem.title === item.title);
            if (foundItem >= 0) {
              taskList.splice(foundItem, 1);
            }
            setTaskList([...taskList]);
          }}
          onSubtaskToggle={handleSubtaskToggle}
          onSubtaskAdd={handleSubtaskAdd}
          onSubtaskRemove={handleSubtaskRemove}
        />
      </div>
    </div>
  );
}

export default HomePage;
