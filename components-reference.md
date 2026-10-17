# Guia de Referencia de Componentes - React ToDo

Gerado em 2026-10-16 por Atlas, a partir da leitura integral do codigo em todo-app-clone @ branch feature/keyboard-shortcuts (src/components, src/pages/home.js, src/App.js, src/utils/recurrence.js).

## Composicao e fluxo de dados

App = ThemeProvider (context de tema em src/theme.js) > AppRouter (src/pages/routes.js) > HomePage.

HomePage concentra TODO o estado das tarefas via useState local:
- taskList (array de tarefas)
- view: all | today | week
- filterCategory: All ou uma categoria
- searchText: string da busca

Nao ha Context API para tarefas - dados descem por props.

Fluxo:
- AddTask dispara onAdd(task); HomePage faz setTaskList com spread do task + id Date.now() + subtasks vazio.
- SearchBar emite onTextSearch com 3+ chars e debounce de 300ms; o texto vai para TaskList.searchTerm e TaskItem usa HighlightText.
- CategorySelect emite onChange; controla filterCategory (All ou categoria).
- Tabs de view filtram por dueDate string YYYY-MM-DD comparada com hoje / hoje + 7 dias.
- Tarefa recorrente concluida aciona utils/recurrence.createNextInstance() que gera a proxima ocorrencia.

---

## Componentes da aplicacao

### AddTask (components/AddTask.js)
Props:
- onAdd(newTask): obrigatoria. Recebe objeto com title (trim nao vazio), category (default Personal), checked false, recurrence (RECURRENCE.*), dueDate (YYYY-MM-DD ou vazio), tags (array de strings), description.

Estado interno:
- taskTitle, category, recurrence, dueDate, tags, description, charCount - todos resetados apos adicionar.

Comportamento:
- MAX_CHARS = 500 para descricao; contador colorido: warning a partir de 400 chars (80 por cento), error em 500.
- Bloqueia add sem titulo; valida limite de descricao.

Nota: corrige memoria interna antiga (15/10) que dizia que AddTask nao tinha campo descricao - o campo existe com contador de caracteres.

### TaskList (components/TaskList.js)
Props:
- dataSource: array de tarefas (obrigatorio).
- onCheck(item), onRemove(item): callbacks obrigatorios.
- onSubtaskToggle(taskId, subtaskId), onSubtaskAdd(taskId, text), onSubtaskRemove(taskId, subtaskId): callbacks repassados ao TaskItem.
- emptyMessage: string opcional; default 'Nao ha nenhuma tarefa adicionada!'.
- searchTerm: string opcional propagada ao TaskItem para highlight.

Estado interno: nenhum (componente puro de renderizacao).
Comportamento: renderiza mensagem vazia quando dataSource.length === 0; mapeia itens para TaskItem usando key = item.id.
Gap critico: sem PropTypes nem guards - dataSource undefined quebra no acesso .length; itens malformados sem id/title nao sao tratados.

### TaskItem (components/TaskItem.js)
Props:
- item: tarefa com id, title, checked, dueDate (opcional), tags (opcional), description (opcional), subtasks (opcional).
- onCheck(item), onRemove(item): callbacks.
- onSubtaskToggle(taskId, subtaskId), onSubtaskAdd(taskId, text), onSubtaskRemove(taskId, subtaskId): callbacks de subtarefas.
- searchTerm: string opcional para highlight.

Estado interno:
- showSubtasks (boolean, default false) - controla painel de subtarefas.

Comportamento derivado por render:
- isOverdue = !checked && dueDate && new Date() > new Date(dueDate): aplica classe overdue e badge Atrasada.
- Badge de progresso de subtarefas doneCount/total quando total > 0.
- Modo busca ativo quando searchTerm.trim().length >= 3: titulo, descricao e tags (#tag) via HighlightText com mark.
- Painel SubtaskList quando showSubtasks true, com adapters que injetam item.id nos callbacks.

Observacao: comparacao de dueDate via new Date() a cada render; formatos mistos de data podem gerar falsos atrasos (ver Gaps).

### SubtaskList (components/SubtaskList.js)
Props:
- subtasks: array de { id, text, done } ou undefined (tratado como []).
- onToggle(id), onAdd(text), onRemove(id): callbacks.

Estado interno:
- newSubtask (string) - texto do input; limpo apos add via form submit.

Comportamento:
- Barra de progresso com width percentual = round(done/total * 100) e label doneCount/total done.
- Ignora add com texto vazio apos trim.

### SearchBar (components/SearchBar/SearchBar.js)
Props:
- onFilterChange(value): callback para filtro de status (all | completed | pending).
- onTextSearch(q): callback de busca; recebe q trimmed ou string vazia.
- initialFilter: string opcional, default all.

Estado interno:
- filter (select de status), query (texto da busca).
Refs: inputRef (foco apos limpar) e debounceRef (timer de 300ms, limpo no unmount/clear/mudanca).

Regras de emissao:
- Menos de 3 chars: nao emite (exceto vazio, que emite string vazia imediatamente).
- Enter emite imediato se >= 3 chars; Escape e botao X limpam e refocam o input.

Nota: corrige memoria interna antiga que descrevia o SearchBar apenas como filtro por status - hoje tambem faz busca textual com debounce e a11y (labels, role combobox, aria-label).

## Componentes utilitarios

### Button (components/Button.js)
Props: text (ReactNode), onClick (callback), className (string). Sem estado. Renderiza button.btn com a classe informada.

### TextInput (components/TextInput.js)
Props: placeholder, className, value, onChange(event). Input controlado generico, sem estado interno.

### CategorySelect (components/CategorySelect.js)
Props: value (string controlada), onChange(value). Sem estado; opcoes fixas: Personal, Work, Shopping, Health, Other. Usado no AddTask e no filtro da HomePage (com valor All no filtro).

### HighlightText (components/HighlightText.js)
Props: text (string), searchTerm (string). Sem estado; usa utils/highlight.splitTextForHighlight para dividir o texto e envolver trechos com mark.search-highlight. Usado pelo TaskItem quando a busca esta ativa.

## Componentes didaticos / fora de uso

### Counter (components/Counter.js)
Class component de exemplo (didatico): state count = 1 e max = 1; increment e reset com bind no constructor; lifecycle vazio (componentDidMount/WillUnmount) e log no componentDidUpdate quando count chega a 0. Nao usado na app.

### FunctionalCounter (components/FunctionalCounter.js)
Versao funcional do Counter, tambem didatica: state count, max e date; useEffect para log de zerado; useEffect de mount adiciona listener global de mousemove que incrementa o contador (bug didatico: cleanup vazio, listener nunca removido; cleanup comentado). Nao usado na app.

### ConfirmationModal (components/ConfirmationModal.js)
Stub: retorna null. Sem props nem estado. Provavel placeholder para modal de confirmacao de remocao - candidato a implementacao futura.

## Hooks e utils de apoio

- useKeyboardShortcuts (src/hooks/useKeyboardShortcuts.js): hook de atalhos de teclado (branch feature/keyboard-shortcuts).
- useReminderScheduler (src/hooks/useReminderScheduler.js): hook para agendamento de lembretes.
- utils/recurrence.js: constantes RECURRENCE (none, daily, weekly, monthly), isValidRecurrence, getNextOccurrence (com clamp para fim de mes) e createNextInstance (retorna null se nao recorrente).
- utils/highlight.js: splitTextForHighlight usado pelo HighlightText.

## Gaps e informacoes desatualizadas

1. Sem PropTypes nem TypeScript em nenhum componente; sem validacao de props ou guards para dados malformados (id/title ausentes). TaskList quebra com dataSource undefined.
2. HomePage identifica tarefas por title no onCheck/onRemove (find por title) em vez de id - duplicatas de titulo causam comportamento incorreto.
3. onRemove usa splice direto no estado taskList (mutacao de estado) antes do setTaskList.
4. Formato de dueDate misto: AddTask grava YYYY-MM-DD; createNextInstance grava ISO completo; comparacoes new Date() por render podem divergir entre navegadores/formatos.
5. ConfirmationModal e stub vazio; Counter/FunctionalCounter sao didaticos e nao usados - candidatos a limpeza ou movimentacao para pasta examples.
6. SearchBar.onFilterChange recebe noop na HomePage ((value) => {}): filtro all/completed/pending existe na UI mas nao filtra nada ainda.
7. Memorias internas antigas desatualizadas corrigidas neste guia: AddTask ja tem descricao com contador; SearchBar ja tem busca textual com debounce.
