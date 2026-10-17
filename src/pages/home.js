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
const{deletedInfo,removeTask,undoDelete,clearExpired}=useUndoDelete(taskList,setTaskList);
const h=useHomeHandlers(taskList,setTaskList);
var vt=filterByView(taskList,view);
var ft=cat==='All'?vt:vt.filter(function(t){return t.category===cat;});
return(
<div className="App"><div className="container">
h1 React ToDo /h1
<ViewTabs view={view} setView={setView}/></div>