# Spec SDD – Subtarefas (checklist) no TaskItem

## Contexto

O app ToDo evoluiu com busca full-text, prioridades, drag-and-drop e filtro por tags, mas uma tarefa ainda era um item atômico: não havia como decompor uma tarefa em etapas menores acompanháveis dentro do próprio card.

## Problema

Tarefas compostas por múltiplas etapas exigiam que o usuário criasse várias tarefas independentes ou mantivesse o controle mentalmente/fora do app, sem progresso visível.

## Objetivos

1. Modelo de subtarefa `{id,text,done}` armazenado no campo `subtasks` de cada tarefa.
2. Handlers imutáveis `toggle`/`add`/`rem` em `useHomeHandlers`, seguindo o padrão patch/map/filter/concat já usado no projeto.
3. Badge de progresso `doneCount/total` visível no `TaskItem`.
4. Painel expansível (`SubtaskList`) para adicionar, marcar e remover subtarefas sem sair do card.

## Não objetivos

- Aninhar subtarefas em mais de um nível (sem sub-subtarefas).
- Reordenar subtarefas via drag-and-drop nesta iteração.
- Nova persistência – o estado permanece em memória da HomePage.

## Design

### Modelo

Cada tarefa pode carregar `subtasks:[{id,text,done}]`. O `id` é textual e estável, gerado pelo util compartilhado `makeId()` (`src/utils/makeId.js`) – mesma fonte usada pelo `onCreate` da HomePage para ids de tarefas, garantindo consistência entre os dois níveis.

### Handlers (`src/pages/useHomeHandlers.js`)

| Handler | Semântica |
|---|---|
| toggle(tid,sid) | Inverte `done` da subtarefa via map imutável |
| add(tid,text) | Concatena `{id:makeId(),text,done:false}` ao array existente (`||[]`) |
| rem(tid,sid) | Remove por identidade via filter |

Todos operam sobre o patch imutável existente (`tasks.map(...)`), sem mutar estado anterior – compatível com undo/delete e reorder que leem o array raiz.

### Componentes

- `TaskItem`: badge numérico `doneCount/total` renderizado quando a tarefa possui subtarefas; clique alterna a expansão do painel.
- `SubtaskList`: painel expansível com input de nova subtarefa, checkbox por item e botão de remoção; dispara os handlers via props (`onSubToggle`,`onSubAdd`,`onSubRem`) repassados pela HomePage.

## Crítica da rota inicial e evolução

A rota inicial gerava o id da subtarefa como `text.length+Date.now()`.
Pontos fracos identificados:
1. Colisão garantida ao adicionar duas subtarefas com o mesmo texto no mesmo milissegundo (mesmo length + mesmo timestamp) – quebraria toggle/rem por identidade.
2. Duplicava lógica de geração de id já existente em `home.js`, divergindo do padrão do projeto.
Evolução adotada:
extração do util compartilhado `src/utils/makeId.js` (crypto.randomUUID com fallback determinístico + contador) e uso nos dois pontos de criação; teste TDD primeiro cobrindo ids únicos para textos iguais em sequência (`useHomeHandlers.subtask-add.test.js`).
Ponto fraco restante aceito conscientemente:
subtarefas não participam da busca full-text nem das contagens de tags – suficiente para esta iteração; evolução futura possível é indexá-las na busca ou promovê-las a tarefas independentes ("promover para tarefa"), documentado aqui como decisão explícita.
