import { useState } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

function isToday(dueDate) {
  if (!dueDate) return false;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return dueDate === `${yyyy}-${mm}-${dd}`;
}

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [view, setView] = useState('all');

  const visibleTasks = view === 'today'
    ? taskList.filter((task) => isToday(task.dueDate))
    : taskList;

  return (
    <div className="App">
      <div className="container">
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
        </div>

        <AddTask
          onAdd={(task) => {
            setTaskList([
              ...taskList,
              task
            ]);
          }}
        />

        <TaskList
          dataSource={visibleTasks}
          emptyMessage={view === 'today'
            ? 'Nenhuma tarefa vence hoje!'
            : 'Não há nenhuma tarefa adicionada!'}
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
      </div>

    </div>
  );
}

export default HomePage;
