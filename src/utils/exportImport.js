// Export/import JSON de tarefas — spec em docs/specs/export-import-sdd.md.
import makeId from './makeId';
import { isValidPriority } from './priority';
import { RECURRENCE } from './recurrence';

export const SCHEMA_VERSION = 1;

function pad(n){
  return String(n).padStart(2, '0');
}

export function buildExportFilename(date){
  var d = date instanceof Date ? date : new Date();
  return 'todo-tasks-' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '.json';
}

function validRecurrence(v){
  return v === RECURRENCE.NONE || v === RECURRENCE.DAILY || v === RECURRENCE.WEEKLY || v === RECURRENCE.MONTHLY;
}

function normalizeSubtask(s){
  if (!s || typeof s !== 'object') s = {};
  return {
    id: (s.id != null && s.id !== '') ? String(s.id) : makeId(),
    text: String(s.text == null ? '' : s.text),
    done: Boolean(s.done)
  };
}

function normalizeTask(t){
  if (!t || typeof t !== 'object') t = {};
  var checkedRaw = t.checked != null ? t.checked : t.done;
  var dueRaw = t.dueDate != null ? t.dueDate : t.deadline;
  return {
    id: (t.id != null && t.id !== '') ? String(t.id) : null,
    title: String(t.title == null ? '' : t.title),
    description: String(t.description == null ? '' : t.description),
    category: String(t.category == null ? '' : t.category),
    checked: Boolean(checkedRaw),
    priority: (typeof t.priority === 'string' && isValidPriority(t.priority)) ? t.priority : 'media',
    tags: Array.isArray(t.tags) ? t.tags.map(String) : [],
    dueDate: (dueRaw == null || dueRaw === '') ? '' : String(dueRaw),
    recurrence: (typeof t.recurrence === 'string' && validRecurrence(t.recurrence)) ? t.recurrence : 'none',
    subtasks: Array.isArray(t.subtasks) ? t.subtasks.map(normalizeSubtask) : []
  };
}

export function serializeTasks(tasks){
  var list = Array.isArray(tasks) ? tasks : [];
  return JSON.stringify({
    version: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    tasks: list.map(normalizeTask)
  }, null, 2);
}

export function validatePayload(payload){
if(!payload||typeof payload!=='object')return{ok:false,error:'Payload inválido.'};
var rawTasks=Array.isArray(payload)?payload:payload.tasks;
if(!Array.isArray(rawTasks))return{ok:false,error:'Campo "tasks" deve ser um array.'};
if(!Array.isArray(payload)){
if(payload.version!=null&&payload.version!==SCHEMA_VERSION){
return{ok:false,error:'Versão do arquivo incompatível (esperado '+SCHEMA_VERSION+').'};
}
}
return{ok:true};
}

// Converte texto JSON em lista de tarefas validada.
// Raiz aceita objeto {version,tasks} OU array direto.
// Itens sem title válido são descartados; se nenhum restar, retorna lista vazia válida.
export function parseTasks(text){
var payload;
try{
payload=JSON.parse(text);
}catch(err){
return{ok:false,error:'JSON inválido.'};
}
var v=validatePayload(payload);
if(!v.ok)return v;
var rawTasks=Array.isArray(payload)?payload:payload.tasks;
var tasks=rawTasks
.filter(function(t){return t&&typeof t==='object'&&String(t.title==null?'':t.title).trim()!=='';})
.map(normalizeTask);
return{ok:true,tasks:tasks};
}

// Merge imutável sem duplicatas por id (spec R4).
// Tasks com id já existente ou sem id recebem novo id via makeId().
export function mergeTasks(current,incoming){
var base=Array.isArray(current)?current.slice():[];
var seen={};
base.forEach(function(t){if(t&&t.id!=null)seen[String(t.id)]=true;});
var added=(Array.isArray(incoming)?incoming:[])
.filter(function(t){return t&&typeof t==='object'&&String(t.title==null?'':t.title).trim()!=='';})
.map(function(t){
var task=normalizeTask(t);
if(task.id==null||seen[String(task.id)]){task.id=makeId();}
seen[String(task.id)]=true;
return task;
});
return base.concat(added);
}
