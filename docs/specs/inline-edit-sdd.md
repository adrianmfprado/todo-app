# SDD - Edicao inline de titulo e descricao das tarefas

**Branch:** `feature/inline-edit` · **Data:** 2026-10-20 · **Status:** Implementado (TDD)

## Contexto atual (lido da main @6f74755)

Titulo e descricao sao texto puro no `TaskItem`; nao ha caminho de edicao pela UI.
Corrigir um typo hoje exige apagar/recriar a tarefa perdendo checked/tags/prioridade/dueDate/subtarefas.
A descricao so aparece durante busca ativa (`active && hasDesc`) - invisivel fora dela.

## Causas / problema

Falta edicao in-place barata; custo alto destruicao-recriacao desincentiva manutencao dos dados;
descricao oculta fora da busca agrava descoberta.

## Rota v1 (descartada)

Modal dedicado de edicao.

**Critica:** peso extra de UI conflita com pedido explicito do owner (edicao inline);
mais cliques/friccao; afasta-se do carater didatico nativo hooks + estado local.

## Rota v2 adotada

Edicao inline nativa:

1. Gatilho **duplo-clique** sobre titulo ou descricao -> input preenchido com valor corrente.
   Enter salva · blur salva · Esc cancela restaura anterior.
   Titulo vazao rejeitado mantem anterior coerente com AddTask;
   descricao clampada em MAX_CHARS=500 extraida p/ util compartilhada evita magic number duplicado.
2. Descricao passa **sempre visivel** quando presente (`hasDesc` independe busca);
   HighlightText permanece quando busca ativa.
3. Guarda `typeof onUpdate === function` evita crash em usos antigos sem a prop nova.
4. Pipeline estado via util pura espelho reorderTasks/taskOps:
   `updateTasks(tasks,id,f)` imutavel mesma ref casos inaplicaveis;
f recebe a task original habilitando patches computados futuros.
5. Wiring home -> section -> list -> item prop nova `onUpdate`
analogo ao padrao onReorder consolidado na PR #21.
6. CSS minimo cursor pointer/hover/input estilos styles/inline-edit.scss import padrao priority.scss.

### Decisoes deliberadas

* Duplo-clique vs clique unico evita edicoes acidentais durante selecao/drag;
click simples fica livre p interacoes futuras.
* Sem biblioteca externa zero deps recursos nativos React hooks estado local.
* Sem persistencia fisica storage escopo proprio follow-up ja registrado objetivo.
* Descricao sempre visivel melhoria necessaria p feature fazer sentido fora busca;
cobertura regressao incluida nos novos testes componente/integracao.
* Comportamento legado preservado check por titulo mutante segue verbatim fora escopo follow-up conhecido fix/check-by-id remoto ja existe monitoravel depois.

## Testes derivados TDD escritos ANTES implementacao

| Nivel | Arquivo | Cobre |
|---|---|---|
| Unit | src/utils/__tests__/limits.test.js | MAX_CHARS=500 contrato compartilhado |
| Unit | src/utils/__tests__/updateTasks.test.js | merge imutavel mesma-ref casos invalidos preserva refs vizinhas |
| Componente | src/components/__tests__/TaskItem.inline-edit.test.jsx | entrar/salvar/cancelar blur/Esc/vazio/guard/desc-visivel |
| Integracao | src/components/__tests__/InlineEdit.integration.test.jsx | HomePage ponta-a-ponta persistencia estado raiz |

## Criterios aceite
