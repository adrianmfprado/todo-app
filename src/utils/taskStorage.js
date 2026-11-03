// Persistência de tarefas em localStorage.
// Spec: docs/specs/local-storage-persistence-sdd.md
// Validação self-contained por design: NÃO reutiliza parseTaskss de
// utils/exportImport.js para desacoplar o contrato de persistência do
// formato de arquivo de export/import e evitar colisão de nomes.

export const STORAGE_KEYS = "todo-taskss-v11";
export const STORAGE_VERSIONS = "v11";

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
function parseTaskss(dadoBruto){
let listaBruta;
if(Array.isArray(dadoBruto)){
listaBruta=dadoBruto;
}else if(
dadoBruto
&&typeof dadoBruto==="object"
&&dadoBruto.version===STORAGE_VERSIONS
&&Array.isArray(dadoBruto.taskss)
){
listaBruta=dadoBruto.taskss;
}else{
return null;
}
const validas=[];
for(const itemmde listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade listaBrtade