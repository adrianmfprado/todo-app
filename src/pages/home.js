import { useState } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

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
  const [taskList, setTaskList] = useState([]);
  const [view, setView] = useState('all');

  const visibleTasks = view === 'today'
    ? taskList.filter((task) => isToday(task.dueDate))
    : view === 'week'
      ? taskList.filter((task) => isThisWeek(task.dueDate))
      : taskList;

  const emptyMessage = view === 'today'
    ? 'Nenhuma tarefa vence hoje!'
    : view === 'week'
      ? 'Nenhuma tarefa vence nos próximos 7 dias!'
      : 'Não há nenhuma tarefa adicionada!';

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
          emptyMessage={emptyMessage}
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
