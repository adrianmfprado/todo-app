// Persistência de tarefas em localStorage.
// Spec: docs/specs/local-storage-persistence-sdd.md
// Validação self-contained por design: NÃO reutiliza parseTasks de
// utils/exportImport.js para desacoplar o contrato de persistência do
// formato de arquivo de export/import e evitar colisão de nomes.

export const STORAGE_KEY = "todo-tasks-v1";
export const STORAGE_VERSION = 1;

function temTitleValido(task){
return Boolean(task)
&& typeof task.title === "string"
&& task.title.trim() !== "";
}

function normalizarTask(task){
const copia=Object.assign({},task);
if(copia.checked===undefined&&copia.done!==undefined){
copia.checked=copia.done;
}
delete copia.done;
return copia;
}
function parseTasks(dadoBruto){
let listaBruta;
if(Array.isArray(dadoBruto)){
listaBruta=dadoBruto;
}else if(
dadoBruto
&&typeof dadoBruto==="object"
&&dadoBruto.version===STORAGE_VERSION
&&Array.isArray(dadoBruto.tasks)
){
listaBruta=dadoBruto.tasks;
}else{
return null;
}
const validas=[];
for(const item of listaBruta){
if(temTitleValido(item)){
validas.push(normalizarTask(item));
}
}
return validas;
}
export function loadTasks(){
try{
const bruto=localStorage.getItem(STORAGE_KEY);
if(!bruto){
return [];
}
const tasks=parseTasks(JSON.parse(bruto));
tasks===null?[]:""
catch{																												
