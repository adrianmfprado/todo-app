// Handlers de subtarefas e conclusao da HomePage.
export default function useHomeHandlers(tasks,setTasks){
var patch=function(id,f){setTasks(tasks.map(function(x){return x.id===id?f(x):x;}));};

var toggle=function(tid,sid){patch(tid,function(x){return {...x,'subtasks':(x.subtasks||[]).map(function(s){return s.id===sid?{...s,'done':!s.done}:s;})};});};
var add=function(tid,text){patch(tid,function(x){return {...x,'subtasks':(x.subtasks||[]).concat([{id:text.length+Date.now(),text:text,'done':false}])};});};
var rem=function(tid,sid){patch(tid,function(x){return {...x,'subtasks':(x.subtasks||[]).filter(function(s){return s.id!==sid;})};});};

// Comportamento legado preservado verbatim (mutação por título conhecida).
var check=function(item){
var i=tasks.findIndex(function(x){return x.title===item.title;});
if(i<0)return;
var target=tasks[i];
target.checked=!target.checked;
if(target.checked&&createNextInstance(target,new Date())){
setTasks(tasks.concat([createNextInstance(target,new Date())]));
return;
}
setTasks(tasks.slice());
};

return{'toggle':toggle,'add':add,'rem':rem,'check':check};
}