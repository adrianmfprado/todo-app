// Modelo de prioridades das tarefas (segue convencao de utils/recurrence.js).

export const PRIORITY = {
 ALTA:'alta',
 MEDIA:'media',
 BAIXA:'baixa',
};

export const DEFAULT_PRIORITY = PRIORITY.MEDIA;

export const PRIORITY_LABELS = {
 alta:'Alta',
 media:'Média',
 baixa:'Baixa',
};

// Menor peso = maior prioridade.
// Tarefas sem prioridade valida recebem peso maximo (vao ao final na ordenacao).
export const PRIORITY_WEIGHT = {
 alta: