import { useState } from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import CategorySelect from '../components/CategorySelect';
import Snackbar from '../components/SnackBar';
import ViewTabs from './ViewTabs';
import useHomeHandlers from './useHomeHandlers';
import useUndoDelete from '../hooks/useUndoDelete';
import { isToday, isThisWeek } from '../utils/dateFilters';

function HomePage(){
const[taskList,setTaskList]=useState([]);
const[view,setView]=useState('all');
const[filterCategory,setFilterCategory]=useState('All');

const{deletedInfo,removeTask,undoDelete,clearExpired}=useUndoDelete(taskList,setTaskList);
const handlers=useHomeHandlers(taskList,setTaskList);

var viewTasks=taskList;
if(view==='today')viewTasks=taskList.filter(function(t){return isToday(t.dueDate);});
if(view==='week')viewTasks=taskList.filter(function(t){return isThisWeek(t.dueDate);});
var filteredTasks=filterCategory==='All'?viewTasks:viewTasks.filter(function(t){return t.category===filterCategory;});

var emptyMessage=view==='today'?'Nenhuma tarefa vence hoje!':view==='week'?'Nenhuma tarefa vence nos próximos 7 dias!':'Não há nenhuma tarefa adicionada!';

return(
<div className="App">
<div className="container">
<h1>React ToDo</h1>
<ViewTabs view={view} setView={setView}/>
<AddTask onAdd={function(task){setTaskList(taskList.concat([{...task,id:Date.now(),subtasks:[]}]));}}/>
<div className="filter-section">
<label>Filter by Category: </label>
<CategorySelect value={filterCategory} onChange={setFilterCategory}/>
</div>
<TaskList dataSource={filteredTasks} emptyMessage={emptyMessage}
onCheck={handlers.check} onRemove={removeTask}
onSubtaskToggle={handlers.toggle} onSubtaskAdd={handlers.add} onSubtaskRemove={handlers.rem}/>
{deletedInfo&&(
<Snackbar key={deletedInfo.seq}
message={'Tarefa "'+deletedInfo.task.title+'" removida'}
autoHideDurationMs={UNDO_DURATION_MS}
onActionClick={undoDelete}
onExpireAction={()=>{}}/></div>