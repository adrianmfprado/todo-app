// Modelo de prazos das tarefas.
// Formato canonico de dueDate: STRING AAAA-MM-DD comparada lexicograficamente,
// sem parse de timezone em nenhum ponto do caminho novo.

export var DEADLINE_STATUS={OVERDUE:'overdue',TODAY:'today',FUTURE:'future'};

var DAY_RE=/^\d{4}-\d{2}-\d{2}$/;

function pad(n){var s=''+n;return s.length<2?'0'+s:s;}

// Converte um objeto Date para chave AAAA-MM-DD usando componentes LOCAIS.
export function toDayKey(date){
if(!(date instanceof Date)||isNaN(date.getTime()))return '';
return date.getFullYear()+'-'+pad(date.getMonth()+1)+'-'+pad(date.getDate());
}

// Chave canonica do dia de HOJE na timezone LOCAL.
export function todayKey(){return toDayKey(new Date());}

// Normaliza valores legados para AAAA-MM-DD:
// - ja canonico -> mantem;
// - ISO completo -> extrai a parte da data;
// - qualquer outro formato/vazio/nulo -> ''.
export function normalizeDayKey(value){
if(typeof value!=='string')return '';
var v=value.trim();
if(DAY_RE.test(v))return v;
if(v.length>10&&v.charAt(10)==='T'&&DAY_RE.test(v.slice(0,10)))return v.slice(0,10);
return '';
}

// Status do prazo para o badge:
// null quando concluida ou sem prazo valido;
// overdue | today | future caso contrario (comparacao pura por STRING).
export function getDeadlineStatus(raw,isDone){
if(isDone)return null;
var k=normalizeDayKey(raw);
if(!k)return null;
var t=todayKey();
if(k<t)return DEADLINE_STATUS.OVERDUE;
if(k===t)return DEADLINE_STATUS.TODAY;
return DEADLINE_STATUS.FUTURE;
}

function sortWeight(raw){
var k=normalizeDayKey(raw);
return k===''?'9999-99-99':k;
}

// Ordenacao ESTAVEL por prazo (mais proximo primeiro; sem prazo vai ao final).
// Nao muta o array de entrada; empates preservam a ordem original via indice.
// Padrao espelho de sortByPriority.
export function sortByDeadline(tasks){
return tasks
.map(function(task,index){return {task:task,index:index};})
.sort(function(a,b){
var wa=sortWeight(a.task.dueDate);
var wb=sortWeight(b.task.dueDate);
return wa!==wb?(wa<wb?-1:1):(a.index-b.index);
})
.map(function(entry){return entry.task;});
}