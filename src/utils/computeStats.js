// Estatisticas-resumo da taskList para o painel da home.
// Funcao PURA: nao muta a entrada; defensiva contra itens invalidos.
import { getDeadlineStatus, DEADLINE_STATUS } from './deadlineUtils';

// Contadores: total, pendentes, concluidas e atrasadas.
// Atrasada = pendente com prazo vencido (getDeadlineStatus === 'overdue').
// Concluida nunca e atrasada; sem dueDate nunca e atrasada.
// Lista vazia/ausente => zeros. Itens nulos/invalidos sao ignorados.
export function computeStats(tasks){
  var stats={total:0,pending:0,completed:0,overdue:0};
  if(!Array.isArray(tasks)){return stats;}
  for(var i=0;i<tasks.length;i++){
    var t=tasks[i];
    if(!t||typeof t!=='object'){continue;}
    stats.total++;
    if(t.checked===true){
      stats.completed++;
    }else{
      stats.pending++;
      if(getDeadlineStatus(t.dueDate,false)===DEADLINE_STATUS.OVERDUE){
        stats.overdue++;
      }
    }
  }
  return stats;
}
