// Componente de exportacao/importacao JSON da HomePage.
// Spec R1-R5 em docs/specs/export-import-sdd.md.
import { useRef, useState } from 'react';
import Button from './Button';
import Snackbar from './SnackBar';
import { buildExportFilename, serializeTasks, parseTasks, mergeTasks } from '../utils/exportImport';

export default function ExportImport(props){
const{tasks,onImport}=props;
const inputRef=useRef(null);
const[feedback,setFeedback]=useState(null);

function handleExport(){
var blob=new Blob([serializeTasks(tasks)],{type:'application/json'});
var url=URL.createObjectURL(blob);
var link=document.createElement('a');
link.href=url;link.download=buildExportFilename(new Date());
document.body.appendChild(link);link.click();document.body.removeChild(link);
URL.revokeObjectURL(url);
setFeedback({message:'Tarefas exportadas com sucesso.',seq:Date.now()});
}

function handleFileChange(ev){
var file=ev.target.files&&ev.target.files[0];
ev.target.value='';
if(!file)return;
var reader=new FileReader();
reader.onload=function(){
var r=parseTasks(String(reader.result));
if(!r.ok){setFeedback({message:'Erro na importacao: '+r.error,seq:Date.now()});return;}
if(r.tasks.length===0){setFeedback({message:'Nenhuma tarefa valida encontrada no arquivo.',seq:Date.now()});return;}
onImport(mergeTasks(tasks||[],r.tasks));
setFeedback({message:r.tasks.length+' tarefa(s) importada(s) com sucesso.',seq:Date.now()});
};
reader.readAsText(file);
}

return(
<div className='export-import'>
<Button className='export' text='Exportar JSON' onClick={handleExport}/>
<Button className='import' text='Importar JSON' onClick={()=>inputRef.current&&inputRef.current.click()}/>
<input ref={inputRef} type='file' accept='application/json,.json' style={{display:'none'}} onChange={handleFileChange}/>
{feedback&&(<Snackbar key={feedback.seq} message={feedback.message} durationMs={4000} onExpire={()=>setFeedback(null)}/>)}
</div>
);
}
