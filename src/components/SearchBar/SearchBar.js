import React,{useState,useRef,useEffect}from'react';

const MIN_SEARCH_CHARS=3;

export default function SearchBar({onFilterChange,onTextSearch,initialFilter='all'}){
const[filter,setFilter]=useState(initialFilter);
const[query,setQuery]=useState('');
const inputId='todo-search-input';
const statusId='todo-search-status';
const inputRef=useRef(null);
const debounceRef=useRef(null);

useEffect(()=>()=>{if(debounceRef.current){clearTimeout(debounceRef.current);}},[]);

const stopTimer=()=>{if(debounceRef.current){clearTimeout(debounceRef.current);debounceRef.current=null;}};
const emit=(v)=>{if(onTextSearch){onTextSearch(v);}};
const handleFilterChange=(e)=>{const v=e.target.value;setFilter(v);onFilterChange(v);};
const handleQueryChange=(e)=>{
const v=e.target.value;
setQuery(v);
stopTimer();
const trimmed=v.trim();
if(trimmed===''){emit('');return;}
if(trimmed.length<MIN_SEARCH_CHARS){return;}
debounceRef.current=setTimeout(()=>{debounceRef.current=null;emit(trimmed);},300);
};
const handleClear=()=>{stopTimer();setQuery('');emit('');if(inputRef.current){inputRef.current.focus();}};
const handleKeyDown=(e)=>{if(e.key==='Enter'){e.preventDefault();stopTimer();const trimmed=query.trim();if(trimmed.length>=MIN_SEARCH_CHARS){emit(trimmed);}else if(trimmed===''){emit('');}}if(e.key==='Escape'){e.preventDefault();handleClear();}};
return (
<div className='search-bar'>
<div className='search-bar-status'>
<label htmlFor={statusId}>Filtrar por status:</label>
<select id={statusId} value={filter} onChange={handleFilterChange}>
<option value='all'>Todos</option>
<option value='completed'>Concluídas</option>
<option value='pending'>Pendentes</option>
</select>
</div>
<div className='search-bar-text'>
<label htmlFor={inputId}>Buscar tarefas:</label>
<input
id={inputId}
ref={inputRef}
type='text'
role='combobox'
aria-label='Buscar tarefas'
placeholder='Digite pelo menos três caracteres'
value={query}
onChange={handleQueryChange}
onKeyDown={handleKeyDown}
/>
{query!==''&&(
<button type='button' className='search-clear-btn' aria-label='Limpar busca' onClick={handleClear}>X</button>
)}
</div>
</div>
);
}
