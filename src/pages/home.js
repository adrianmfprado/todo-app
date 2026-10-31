import { useState } from 'react';
import StatsPanel from '../components/StatsPanel';
import { computeStats } from '../utils/computeStats';
import CategorySelect from '../components/CategorySelect';
import SearchBar from '../components/SearchBar/SearchBar';
import ViewTabs from './ViewTabs';
import TaskSection from './TaskSection';
import useHomeHandlers from './useHomeHandlers';
import useUndoDelete from '../hooks/useUndoDelete';
import { filterByView, emptyMessageFor } from '../utils/viewFilters';
import reorderTasks from '../utils/reorderTasks';
import updateTasks from '../utils/updateTasks';
import makeId from '../utils/makeId';

function HomePage(){
const[taskList,setTaskList]=useState([]);
const[view,setView]=useState('all');
const[cat,setCat]=useState('All');
const[searchText,setSearchText]=useState('');
const u=useUndoDelete(taskList,setTaskList);
const h=useHomeHandlers(taskList,setTaskList);
var vt=filterByView(taskList,view);
var ft=cat==='All'?vt:vt.filter(function(t){return t.category===cat;});
var normalizedSearch=searchText.trim().toLowerCase();
var searchedTasks=normalizedSearch===''?ft:ft.filter(function(task){
var haystack=[
String(task.title||''),
String(task.description||''),
Array.isArray(task.tags)?task.tags.join(' '):''
].join(' ').toLowerCase();
return haystack.includes(normalizedSearch);
});
var emptyMessage;
if(normalizedSearch!==''&&searchedTasks.length===0){
emptyMessage='Nenhuma tarefa encontrada para "'+searchText.trim()+'"';
}else{
emptyMessage=emptyMessageFor(view);
}
return(
<div className='App'><div className='container'>
<h1>React ToDo</h1>
<StatsPanel stats={computeStats(taskList)}/>
<ViewTabs view={view} setView={setView}/>
<SearchBar onFilterChange={(value) => {}} onTextSearch={setSearchText}/>
<div className='filter-section'><label>Filtrar por categoria: </label>
<CategorySelect value={cat} onChange={setCat}/></div>
<TaskSection tasks={searchedTasks} emptyMessage={emptyMessage} searchTerm={normalizedSearch}
onCreate={function(t){setTaskList(taskList.concat([{...t,id:makeId(),subtasks:[]}]));}}
onCheck={h.check} onRemove={u.removeTask} onUpdate={function(id,payload){setTaskList(updateTasks(taskList,id,function(t){return Object.assign({},t,payload);}));}} onReorder={function(fromId,toId){setTaskList(reorderTasks(taskList,fromId,toId));}}
onSubToggle={h.toggle} onSubAdd={h.add} onSubRem={h.rem}
deletedInfo={u.deletedInfo} onUndo={u.undoDelete} onExpire={u.clearExpired}/>
</div></div>
);
}

export default HomePage;
