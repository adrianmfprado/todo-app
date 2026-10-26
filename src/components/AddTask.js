import React,{useState} from 'react';
import Button from './Button';
import TextInput from './TextInput';
import CategorySelect from './CategorySelect';
import {RECURRENCE} from '../utils/recurrence';
import {PRIORITY_LABELS,DEFAULT_PRIORITY} from '../utils/priority';
import imageMais from '../assets/plus.png';

export default function AddTask(props){
const{onAdd}=props;
const[taskTitle,setTaskTitle]=useState('');
const[category,setCategory]=useState('Personal');
const[recurrence,setRecurrence]=useState(RECURRENCE.NONE);
const[dueDate,setDueDate]=useState('');
const[tags,setTags]=useState([]);
const[description,setDescription]=useState('');
const[charCount,setCharCount]=useState(0);
const[priority,setPriority]=useState(DEFAULT_PRIORITY);
const[showAdvanced,setShowAdvanced]=useState(false);
const MAX_CHARS=500;
const handleAdd=()=>{
if(!taskTitle.trim())return;
if(description.trim()&&description.length>MAX_CHARS)return;
onAdd({title:taskTitle,category,checked:false,recurrence,dueDate,tags:tags||[],description,priority});
setTaskTitle('');setCategory('Personal');setRecurrence(RECURRENCE.NONE);setDueDate('');setTags([]);setDescription('');setCharCount(0);setPriority(DEFAULT_PRIORITY);
};
const handleDescriptionChange=(e)=>{setDescription(e.target.value);setCharCount(e.target.value.length);};
const getColorClass=()=>{if(charCount===0)return'';if(charCount>=MAX_CHARS)return'error';if(charCount>=MAX_CHARS*0.8)return'warning';return'';};

return(
<div className='add-task'>
<TextInput className='task-name-input' placeholder='digite o título da tarefa...' value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
<button type='button' className='advanced-toggle' aria-expanded={showAdvanced} onClick={()=>setShowAdvanced(!showAdvanced)}>mais opções</button>
{showAdvanced&&(
<React.Fragment>
<CategorySelect value={category} onChange={setCategory}/>
<select className='recurrence-select' value={recurrence} onChange={(e)=>setRecurrence(e.target.value)}>
<option value={RECURRENCE.NONE}>Não repete</option>
<option value={RECURRENCE.DAILY}>Diária</option>
<option value={RECURRENCE.WEEKLY}>Semanal</option>
<option value={RECURRENCE.MONTHLY}>Mensal</option>
</select>
<input type='date' className='task-due-date' value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/>
<select className='priority-select' aria-label='Prioridade da tarefa' value={priority} onChange={(e)=>setPriority(e.target.value)}>
{Object.keys(PRIORITY_LABELS).map((k)=>(<option key={k} value={k}>{PRIORITY_LABELS[k]}</option>))}
</select>
<div className='tag-input-group'>
<input type='text' className='tag-input' placeholder='Adicionar tags (separadas por vírgula)' value={(tags||[]).join(', ')||''} onChange={(e)=>setTags(e.target.value.split(',').map((t)=>t.trim()).filter((t)=>t))}/>
</div>
<div className='description-input-group'>
<TextInput className='description-input' placeholder='descrição da tarefa (até 500 caracteres)' value={description} onChange={handleDescriptionChange}/>
{charCount>0&&(<div className={'char-counter '+getColorClass()}>{''+charCount+' de '+MAX_CHARS+' caracteres'}</div>)}
</div>
</React.Fragment>
)}
<Button className='add' text={<span><img src={imageMais} alt='add task'/> adicionar tarefa</span>} onClick={handleAdd}/>
</div>);
}
