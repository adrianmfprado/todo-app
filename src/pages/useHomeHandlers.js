import { createNextInstance } from '../utils/recurrence';
import { findTaskIndex } from '../utils/taskOps';

// Handlers de subtarefas e conclusao da HomePage.
export default function useHomeHandlers(tasks,setTasks){
var patch=function(id,f){setTasks(tasks.map(function(x){return x.id===id?f(x):x;}));};

var toggle=function(tid,sid){patch(tid,function(x){return {...x,'subtasks':(x.subtasks||[]).map(function(s){return s.id===sid?{...s,'done':!s.done}:s;})};});};
var add=function(tid,text){patch(tid,function(x){return {...x,'subtasks':(x.subtasks||[]).concat([{id:text.length+Date.now(),text:text,'done':false}])};});};
var rem=function(tid,sid){patch(tid,function(x){return {...x,'subtasks':(x.subtasks||[]).filter(function(s){return s.id!==sid;})};});};

// Conclusao por identidade estavel (id com fallback titulo unico) e atualizacao imutavel.
var check=function(item){
var i=findTaskIndex(tasks,item);
if(i<0)return;
var target=tasks[i];
var updated={...target,'checked':!target.checked};
if(updated.checked&&createNextInstance(updated,new Date())){
setTasks(tasks.slice(0,i).concat([updated],tasks.slice(i+1)).concat([{...createNextInstance(updated,new Date()),'id':Date.now(),'subtasks':[]}])) ;
return;
}
setTasks(tasks.slice(0,i).concat([updated],tasks.slice(i+1)));
};

return{'toggle':toggle,'add':add,'rem':rem,'check':check};
}
