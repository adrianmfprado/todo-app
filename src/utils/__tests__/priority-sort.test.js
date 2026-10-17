// Testes unitarios do utilitario src/utils/priority.js.

export const PRIORITY = { ALTA:'alta', MEDIA:'media', BAIXA:'baixa' };

export const DEFAULT_PRIORITY = PRIORITY.MEDIA;

export const PRIORITY_LABELS = { alta:'Alta', media:'Média', baixa:'Baixa' };

// Menor peso = maior prioridade.
// Tarefas sem prioridade valida recebem peso maximo.
export const PRIORITY_WEIGHT = { alta: