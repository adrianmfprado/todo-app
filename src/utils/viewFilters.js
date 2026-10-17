import { isToday, isThisWeek } from './dateFilters';

// Filtra tarefas pela visualizacao ativa.
export function filterByView(list,view){
if(view==='today')return list.filter(function(t){return isToday(t.dueDate);});
if(view==='week')return list.filter(function(t){return isThisWeek(t.dueDate);});
return list;
}

// Mensagem de lista vazia por visualizacao.
export function emptyMessageFor(view){
if(view==='today')return 'Nenhuma tarefa vence hoje!';
if(view==='week')return 'Nenhuma tarefa vence nos próximos 7 dias!';
return 'Não há nenhuma tarefa adicionada!';
}