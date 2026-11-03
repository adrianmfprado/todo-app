# Local Storage Persistence Spec (SDD)

## Análise (causas → rota → crítica → versão melhorada)
- **Causa raiz**: o estado das tarefas vive só em memória — `useState([])` em `src/pages/home.js` (linha 17). Nenhuma leitura/gravação de tarefas no localStorage existe hoje (grep confirma uso apenas pelo tema).
- **Rota traçada**: util pura de storage (`loadTasks`/`saveTasks`) + wiring na Home: estado inicial carregado do storage e `useEffect` salvando a cada mudança de `taskList`.
- **Crítica da rota ingênua**: `JSON.parse/stringify` diretos sem proteção quebram o app quando o payload está corrompido ou fora do schema, ou quando o localStorage está indisponível/bloqueado; duplicaria a validação já existente no export/import; acoplaria a Home a detalhes de I/O.
- **Versão melhorada**: util pura `src/utils/taskStorage.js`, espelhando o padrão consolidado de `src/theme.js` (try/catch na leitura e gravação, chave exportada), reutilizando `parseTasks` do exportImport como fonte única de validação/normalização na carga; wiring mínimo na Home via lazy initializer + useEffect.

## Requisitos Funcionais
- **Persistência**: tarefas salvas em localStorage na chave `todo-tasks-v1` a cada mudança da lista.
- **Carga inicial**: ao montar, tarefas carregadas do storage; sem valor salvo → lista vazia.
- **Validação**: carga usa `parseTasks` (schema v1 + normalização); payload inválido/corrompido → lista vazia, sem crash.
- **Fallback**: localStorage indisponível ou lançando exceção → app funciona só em memória, silenciosamente.
- **Integração export/import**: ids preservados entre sessões; import via mergeTasks continua sem duplicatas.

## Fluxo
Home (`taskList`) → useEffect → saveTasks(taskList) → localStorage; useState(loadTasks) ← localStorage na montagem.

## Testes de Aceitação
1. Sem chave no storage → loadTasks retorna [].
2. Com payload válido salvo → loadTasks retorna tarefas normalizadas com os mesmos ids.
3. Com JSON inválido ou fora do schema → loadTasks retorna [] sem lançar erro.
4. saveTasks grava `{version,tasks}` serializado na chave correta.
5. Storage lançando exceção nem load nem save propagam erro.
6. Round trip: saveTasks seguido de loadTasks devolve a mesma lista.
7. Home monta com tarefa salva e persiste criações/remoções após interação.