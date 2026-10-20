# SDD — Reordenação de tarefas via drag-and-drop (TaskList)

**Branch:** `feature/drag-reorder` · **Data:** 2026-10-20 · **Status:** Implementado (TDD)

## 1. Contexto e análise da ordem atual

Como a ordem das tarefas é derivada hoje (lido do código real da `main`):

- **Fonte da verdade:** `useState(taskList)` em `src/pages/home.js` — a ordem é a **ordem de inserção** no array de estado.
- **Pipeline de renderização:** `filterByView(view)` → filtro por categoria → filtro de busca full-text → prop `dataSource` do `TaskList`.
- **Ordenação opcional:** dentro do `TaskList`, `sortMode === 'priority'` aplica `sortByPriority(dataSource)` (estável, não mutante) apenas para exibição.
- **Persistência:** não há camada localStorage no fluxo principal; o estado vive apenas em memória durante a sessão.

## 2. Causas / problema a resolver

O usuário não consegue priorizar visualmente sua lista: a única ordenação disponível é automática (prioridade) ou a ordem de inserção. Falta controle manual fino.

## 3. Rota v1 (descartada após crítica)

Usar biblioteca externa (`react-beautiful-dnd` — deprecated — ou `dnd-kit`).

**Crítica:**
- Bundle desnecessário (~30–50 kB gzip) para uma lista vertical simples.
- `react-beautiful-dnd` está arquivado/sem manutenção; incompatível com React 17 StrictMode em cenários reais.
- O app é um exemplo didático de recursos **nativos** do React — dependência pesada contradiz o objetivo.

## 4. Rota v2 (adotada, versão melhorada)

**HTML5 Drag and Drop nativo** (zero dependências, zero bundle extra):

1. **Util pura testável** `src/utils/reorderTasks.js`: `reorderTasks(tasks, fromId, toId)` — imutável, opera sobre a lista **completa** (`taskList`) usando ids estáveis; retorna a mesma referência quando inaplicável (ids ausentes/iguais, lista < 2, entradas nulas).
2. **TaskList**: cada `.task-list-item` vira wrapper com `draggable`, handlers `onDragStart`/`onDragOver`(preventDefault)/`onDrop`; classe visual `.drag-over` no alvo durante hover; prop nova `onReorder(fromId, toId)`.
3. **Guarda de coerência:** drag **desabilitado** quando `sortMode === 'priority'` — ordenação manual sob ordenação automática gera estado confuso (o drop seria sobrescrito pelo sort na próxima render).
4. **home.js**: `onReorder={(fromId, toId) => setTaskList(reorderTasks(taskList, fromId, toId))}` — persistência lógica no estado raiz; a nova ordem sobrevive a filtros/busca/sort porque opera sobre ids da lista completa.
5. **TaskSection.jsx**: apenas repassa `onReorder`.

### Decisões deliberadas
- Reordenar por **id**, não por índice visível: índices visíveis mudam com filtros ativos; ids são estáveis e evitam reordenar a lista errada quando view/categoria/busca estão ativos.
- Sem persistência física (localStorage) nesta PR — o app hoje não persiste nada; adicionar storage é escopo próprio (follow-up registrado).
- CSS mínimo: cursor grab + outline no alvo do drop.

## 5. Testes derivados (TDD)

| Nível | Arquivo | Cobre |
|---|---|---|
| Unit util | `src/utils/__tests__/reorderTasks.test.js` | move frente/trás imutável; ids iguais/inexistentes → mesma ref; lista vazia/unitária/nula; não-mutação |
| Componente | `src/components/__tests__/TaskList.dnd.test.jsx` | drop chama onReorder com ids corretos; classe .drag-over no dragOver; sem draggable quando sortMode=priority |
| Integração | `src/components/__tests__/DragReorder.integration.test.jsx` | pós-drop em HomePage: nova ordem renderizada correta com busca/categoria ativos |

## 6. Critérios de aceite
- [x] Suíte util verde
- [x] Suíte componente/integração verde
- [x] Suíte completa verde (sem regressões) — 18 arquivos / 93 testes
- [ ] Branch publicada + PR mergeada na main