import { useState } from 'react';
import { findTaskIndex } from '../utils/taskOps';

// Soft-delete da ultima exclusao com desfazer posicional.
export default function useUndoDelete(tasks,tasksSetter){
const[deletedInfo,setDeletedInfo]=useState(null);

const removeTask=(item)=>{
let i=findTaskIndex(tasks,item);
if(i<0)return;
setDeletedInfo({task:tasks[i],index:i,seq:Date.now()});
tasksSetter(removeAt(tasks,i));
};

const undoDelete=()=>{
if(!deletedInfo)return;
tasksSetter(prev=>prev.some(t=>t.id===deletedInfo.task.id)?prev:reinsert(prev,deletedInfo.task,deletedInfo.index));
setDeletedInfo(null);
};

return{deletedInfo,removeTask,undoDelete};
}