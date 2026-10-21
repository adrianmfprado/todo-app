// Modelo de tags das tarefas e helpers de filtragem por tag.

function normalizeTag(tag){
return typeof tag==='string'?tag.trim().toLowerCase():'';
}

function safeTasks(tasks){
return Array.isArray(tasks)?tasks:[];
}

// Extrai a lista UNICA de tags existentes nas tarefas,
// na ordem da primeira aparicao.
export function extractTags(tasks){
const seen=new Set();
const result=[];
safeTasks(tasks).forEach(function(task){
if(!task||!Array.isArray(task.tags)){return;}
task.tags.forEach(function(rawTag){
const tag=normalizeTag(rawTag);
if(!tag||seen.has(tag)){return;}
seen.add(tag);
result.push(tag);
});
});
return result;
}

// Conta em quantas tarefas cada tag aparece.
export function countTasksByTag(tasks){
const counts={};
safeTasks(tasks).forEach(function(task){
if(!task||!Array.isArray(task.tags)){return;}
task.tags.forEach(function(rawTag){
const tag=normalizeTag(rawTag);
if(!tag){return;}
counts[tag]=(counts[tag]||0)+1;
});
});
return counts;
}

// Filtra as tarefas que possuem PELO MENOS UMA das tags selecionadas
// (semantica OR). Selecao vazia ou inexistente retorna todas as tarefas.
export function tasksMatchSelectedTags(tasks,selectedTags){
const selected=Array.isArray(selectedTags)?selectedTags:[];
if(selected.length===0){return safeTasks(tasks);}
const selectedSet=new Set(selected.map(normalizeTag).filter(Boolean));
if(selectedSet.size===0){return safeTasks(tasks);}
return safeTasks(tasks).filter(function(task){
if(!task||!Array.isArray(task.tags)){return false;}
return task.tags.some(function(rawTag){
return selectedSet.has(normalizeTag(rawTag));
});
});
}
