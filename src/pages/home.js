import { useState } from 'react';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

function HomePage() {
  const [taskList, setTaskList] = useState([]);

  return (
    <div className="App">
      <div className="container">
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
      </div>

    </div>
  );
}

export default HomePage;
