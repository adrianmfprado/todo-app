# SDD — Exportação/Importação de Tarefas em JSON

## 1. Visão geral
Permitir exportar todas as tarefas do app para um arquivo .json e importar um .json com validação de schema e merge sem duplicatas.

## 2. Requisitos
- R1 Exportar: botão no topo gera `todo-tasks-YYYY-MM-DD.json` com todas as tarefas.
- R2 Importar: botão abre seletor de arquivo; valida conteúdo antes de aplicar.
- R3 Validação de schema: raiz deve ser objeto `{ version, tasks }` ou array; cada task precisa de `title` string não vazia; campos aceitos: `id`, `title`, `done`, `priority`, `category`, `tags`, `deadline`, `subtasks`. Itens inválidos são descartados; se nenhum válido → erro via SnackBar.
- R4 Merge sem duplicatas: tasks importadas com `id` já existente na lista recebem novo id via `makeId()`; tasks sem `id` também recebem novo id via `makeId()`. Dedup é apenas por id.
- R5 UI/DSv1: botões consomem somente tokens (`_tokens.scss` / CSS variables); nada hardcoded.

## 3. Design
Util pura `src/utils/exportImport.js`:
- `serializeTasks(tasks)` → string JSON `{ version: 1, exportedAt: ISO, tasks }`.
- `parseTasks(text)` → `{ ok:true, tasks }` ou `{ ok:false, error }`.
- `mergeTasks(current, incoming)` → nova lista imutável com dedup por id + makeId.
UI em HomePage: dois botões no bloco do topo + input file oculto; feedback via SnackBar existente.

## 4. Critérios de aceite
Testes vitest verdes; smoke Playwright do fluxo export→import verde; lint ok; PR squash na main.