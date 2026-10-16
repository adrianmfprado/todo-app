import { useState } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import CategorySelect from "../components/CategorySelect";
import SearchBar from "../components/SearchBar/SearchBar";
import { createNextInstance } from "../utils/recurrence";

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
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const viewTasks = view === 'today'
    ? taskList.filter((task) => isToday(task.dueDate))
    : view === 'week'
      ? taskList.filter((task) => isThisWeek(task.dueDate))
      : taskList;

  const categoryFilteredTasks = filterCategory === 'All' ? viewTasks : viewTasks.filter(t => t.category === filterCategory);

  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredTasks = normalizedSearch === ''
    ? categoryFilteredTasks
    : categoryFilteredTasks.filter((task) => {
        const haystack = [
          String(task.title || ''),
          String(task.description || ''),
          Array.isArray(task.tags) ? task.tags.join(' ') : ''
        ].join(' ').toLowerCase();
        return haystack.includes(normalizedSearch);
      });

  let emptyMessage;
  if (normalizedSearch !== '' && filteredTasks.length === 0) {
    emptyMessage = 'Nenhuma tarefa encontrada para "' + searchText.trim() + '"';
  } else if (view === 'today') {
    emptyMessage = 'Nenhuma tarefa vence hoje!';
  } else if (view === 'week') {
    emptyMessage = 'Nenhuma tarefa vence nos próximos 7 dias!';
  } else {
    emptyMessage = 'Não há nenhuma tarefa adicionada!';
  }

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
              { ...task, id: Date.now(), subtasks: [] }
            ])
          }}
        />

        <div className="filter-section">
          <label>Filter by Category: </label>
          <CategorySelect value={filterCategory} onChange={setFilterCategory} />
        </div>

        <SearchBar onFilterChange={(value) => {}} onTextSearch={setSearchText} />

        <TaskList
          dataSource={filteredTasks}
          emptyMessage={emptyMessage}
          searchTerm={searchText}
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
          onSubtaskToggle={handleSubtaskToggle}
          onSubtaskAdd={handleSubtaskAdd}
          onSubtaskRemove={handleSubtaskRemove}
        />
      </div>
    </div>
  );
}

export default HomePage;
