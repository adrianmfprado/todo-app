import { useState } from 'react';
import CategorySelect from '../components/CategorySelect';
import SearchBar from '../components/SearchBar/SearchBar';
import ViewTabs from './ViewTabs';
import TaskSection from './TaskSection';
import useHomeHandlers from './useHomeHandlers';
import useUndoDelete from '../hooks/useUndoDelete';
import { filterByView, emptyMessageFor } from '../utils/viewFilters';

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
<ViewTabs view={view} setView={setView}/>
<TaskSection tasks={searchedTasks} emptyMessage={emptyMessage} searchTerm={normalizedSearch}
onCreate={function(t){setTaskList(taskList.concat([{...t,id:Date.now(),subtasks:[]}]));}}
onCheck={h.check} onRemove={u.removeTask}
onSubToggle={h.toggle} onSubAdd={h.add} onSubRem={h.rem}
deletedInfo={u.deletedInfo} onUndo={u.undoDelete} onExpire={u.clearExpired}/>
<div className='filter-section'><label>Filtrar por categoria: </label>
<CategorySelect value={cat} onChange={setCat}/></div>
<SearchBar onFilterChange={(value) => {}} onTextSearch={setSearchText}/>
</div></div>
);
}

export default HomePage;
