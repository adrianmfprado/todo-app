import { useState } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import CategorySelect from "../components/CategorySelect";
import { createNextInstance } from "../utils/recurrence";

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredTasks = filterCategory === 'All' ? taskList : taskList.filter(t => t.category === filterCategory);

  return (
    <div className="App">
      <div className="container">
        <h1>React ToDo</h1>

        <AddTask
          onAdd={(task) => {
            setTaskList([...taskList, task]);
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
            if (foundItem)
              foundItem.checked = !foundItem.checked;

            // When a recurring task is completed, spawn the next occurrence.
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
        />
      </div>
    </div>
  );
}

export default HomePage;
