import { useState } from 'react';
import CategorySelect from '../components/CategorySelect';
import ViewTabs from './ViewTabs';
import TaskSection from './TaskSection';
import useHomeHandlers from './useHomeHandlers';
import useUndoDelete from '../hooks/useUndoDelete';
import { filterByView, emptyMessageFor } from '../utils/viewFilters';

function HomePage(){
const[taskList,setTaskList]=useState([]);
const[view,setView]=useState('all');
const[cat,setCat]=useState('All');
const u=useUndoDelete(taskList,setTaskList);
const h=useHomeHandlers(taskList,setTaskList);
var vt=filterByView(taskList,view);
var ft=cat==='All'?vt:vt.filter(function(t){return t.category===cat;});
return(
<div className='App'><div className='container'>
<h1>React ToDo</h1>
<ViewTabs view={view} setView={setView}/>
<TaskSection tasks={ft} emptyMessage={emptyMessageFor(view)}
onCreate={function(t){setTaskList(taskList.concat([{...t,id:Date.now(),subtasks:[]}]));}}
onCheck={h.check} onRemove={u.removeTask}
onSubToggle={h.toggle} onSubAdd={h.add} onSubRem={h.rem}
deletedInfo={u.deletedInfo} onUndo={u.undoDelete} onExpire={u.clearExpired}/>
<div className='filter-section'><label>Filtrar por categoria: </label>
<CategorySelect value={cat} onChange={setCat}/></div>
</div></div>
);
}

export default HomePage;
