// Modelo de prioridades das tarefas.

export const PRIORITY = { ALTA:'alta', MEDIA:'media', BAIXA:'baixa' };

export const DEFAULT_PRIORITY = PRIORITY.MEDIA;

export const PRIORITY_LABELS = { alta:'Alta', media:'Média', baixa:'Baixa' };

// Menor peso = maior prioridade.
// Tarefas sem prioridade valida recebem peso maximo (vao ao final na ordenacao).
export const PRIORITY_WEIGHT = { alta:0, media:1, baixa:2 };

export function isValidPriority(priority) {
  return priority === PRIORITY.ALTA || priority === PRIORITY.MEDIA || priority === PRIORITY.BAIXA;
}

export function getPriorityLabel(priority) {
  return isValidPriority(priority) ? PRIORITY_LABELS[priority] : '';
}

function weightOf(priority) {
  return isValidPriority(priority) ? PRIORITY_WEIGHT[priority] : Number.MAX_SAFE_INTEGER;
}

// Ordenacao ESTAVEL por prioridade (alta primeiro).
// Nao muta o array de entrada; empates preservam a ordem original via indice.
export function sortByPriority(tasks) {
  return tasks
    .map((task, index) => ({ task, index }))
    .sort((a, b) => {
      const wa = weightOf(a.task.priority);
      const wb = weightOf(b.task.priority);
      return wa !== wb ? wa - wb : a.index - b.index;
    })
    .map((entry) => entry.task);
}

export const PRIORITY_OPTIONS = [
  { value: PRIORITY.ALTA, label: PRIORITY_LABELS.alta },
  { value: PRIORITY.MEDIA, label: PRIORITY_LABELS.media },
  { value: PRIORITY.BAIXA, label: PRIORITY_LABELS.baixa },
];
