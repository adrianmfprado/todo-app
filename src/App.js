import { useState } from 'react';
import AddTask from "./components/AddTask";
import { Counter } from './components/Counter';
import { Form } from './components/Form';
import { FunctionalCounter } from './components/FunctionalCounter';
import TaskList from "./components/TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [showCounter, setShowCounter] = useState(false);
  const [sendCount, setSendCount] = useState(0);

  return (
    <div className="App">
      {/* <div className="container">
        <h1>React ToDo</h1>

        <AddTask
          onAdd={(title) => {
            setTaskList([
              ...taskList,
              {
                title,
                checked: false,
              }
            ])
          }}
        />

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
      </div> */}

      {/* <div>
        <h1>Counter</h1>
        {showCounter && (<Counter />)}
        <button
          onClick={() => setShowCounter(!showCounter)}
        >
          Toggle Counter
        </button>

        <h1>Functional Counter</h1>
        {showCounter && <FunctionalCounter />}
      </div> */}

      <div>
        <h1>Form</h1>
        <Form />
        <Form />
        <Form />
        <span>Envios: {sendCount}</span>
      </div>
    </div>
  );
}

export default App;
