import React,{useState} from 'react';
import trashIcon from '../assets/trash.png';
import SubtaskList from './SubtaskList';
import HighlightText from './HighlightText';
import {isValidPriority,getPriorityLabel} from '../utils/priority';
import {getDeadlineStatus,DEADLINE_STATUS} from '../utils/deadlineUtils';
import {MAX_CHARS} from '../utils/limits';

export default function TaskItem(props){
const{item,onCheck,onRemove,onSubtaskToggle,onSubtaskAdd,onSubtaskRemove,onUpdate}=props;
const searchTerm=props.searchTerm;
const deadlineStatus=getDeadlineStatus(item.dueDate,item.checked);
const[showSubtasks,setShowSubtasks]=useState(false);
const[editingField,setEditingField]=useState(null);
const[draft,setDraft]=useState('');
const subtasks=item.subtasks||[];
const doneCount=subtasks.filter(function(s){return s.done;}).length;
const total=subtasks.length;

var q=String(searchTerm||'').trim();
var active=q.length>=3;
var hasDesc=Boolean(item.description&&String(item.description).trim());
var tags=Array.isArray(item.tags)?item.tags:[];
var canUpdate=typeof onUpdate==='function';

function startEdit(field){setEditingField(field);setDraft(field==='title'?String(item.title||''):String(item.description||''));}
function cancelEdit(){setEditingField(null);setDraft('');}
function commitEdit(){
if(editingField===null)return;
var field=editingField;
var value=field==='description'?draft.slice(0,MAX_CHARS):draft.trim();
setEditingField(null);setDraft('');
if(!canUpdate)return;
if(field==='title'){if(!value)return;}
else{if(value===String(item.description||''))return;}
var payload={};payload[field]=value;
onUpdate(item.id,payload);
}
return(
<div className={`task-list-item ${deadlineStatus===DEADLINE_STATUS.OVERDUE?'overdue':''}`}>
<input checked={item.checked} className='task-list-item-checkbox' type='checkbox' onChange={()=>onCheck(item)} />
{editingField==='title'?(
<input className='task-inline-input' aria-label='Editar titulo da tarefa' autoFocus value={draft}
onChange={(e)=>setDraft(e.target.value)}
onKeyDown={(e)=>{if(e.key==='Enter')commitEdit();else if(e.key==='Escape')cancelEdit();}}
onBlur={commitEdit}/>
):(
<div className='task-list-item-title' onDoubleClick={()=>startEdit('title')}>
{active?<HighlightText text={item.title} searchTerm={q}/>:item.title}
</div>
)}
{hasDesc&&(editingField==='description'?(
<input className='task-inline-input task-inline-input-description' aria-label='Editar descricao da tarefa' autoFocus value={draft}
onChange={(e)=>setDraft(e.target.value)}
onKeyDown={(e)=>{if(e.key==='Enter')commitEdit();else if(e.key==='Escape')cancelEdit();}}
onBlur={commitEdit}/>
):(
<div className='task-list-item-description' onDoubleClick={()=>startEdit('description')}>
{active?<HighlightText text={item.description} searchTerm={q}/>:item.description}
</div>
))}
{(active&&tags.length>0)&&(
<div className='task-list-item-tags'>
{tags.map((tag)=>(<span key={tag} className='task-tag'><HighlightText text={'#'+tag} searchTerm={q}/></span>))}
</div>
)}
{isValidPriority(item.priority)&&(<span className={`task-priority-badge task-priority-${item.priority}`}>{getPriorityLabel(item.priority)}</span>)}
{item.dueDate&&<div className='task-list-item-due'>{item.dueDate}</div>}
{deadlineStatus&&(<span className={`due-date-badge due-date-${deadlineStatus}`}>{deadlineStatus===DEADLINE_STATUS.OVERDUE?'Atrasada':deadlineStatus===DEADLINE_STATUS.TODAY?'Vence hoje':item.dueDate}</span>)}
{total>0&&<span className='subtask-badge'>{doneCount}/{total}</span>}
<button type='button' className='task-list-item-btn subtask-toggle' aria-label='Toggle subtasks' onClick={()=>setShowSubtasks(!showSubtasks)}>{showSubtasks?'▾':'▸'}</button>
<button className='task-list-item-btn' onClick={()=>onRemove(item)}><img src={trashIcon} alt='remove task'/></button>
{showSubtasks&&(
<div className='task-subtasks-panel'>
<SubtaskList subtasks={subtasks} onToggle={(sid)=>onSubtaskToggle(item.id,sid)} onAdd={(text)=>onSubtaskAdd(item.id,text)} onRemove={(sid)=>onSubtaskRemove(item.id,sid)}/>
</div>
)}
</div>
);
}
