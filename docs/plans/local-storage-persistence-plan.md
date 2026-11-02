# Local Storage Persistence Plan

Branch: feature/local-storage-persistence · Base: main · Spec: docs/specs/local-storage-persistence-sdd.md

## Passos
1. Util src/utils/taskStorage.js: STORAGE_KEY='todo-tasks-v1'; loadTasks() lê com try/catch e valida via parseTasks (ok→tasks; senão []); saveTasks(tasks) grava {version,tasks} com try/catch silencioso.
2. Testes TDD primeiro em src/utils/__tests__/taskStorage.test.js cobrindo: carga vazia, hidratação válida com ids estáveis, JSON inválido→[], schema inválido→[], exceção de storage→sem erro, gravação correta e round trip.
3. Wiring em src/pages/home.js: useState(loadTasks) como lazy initializer + useEffect([taskList]) chamando saveTasks(taskList).
4. Teste de integração da Home: monta com storage pré-populado e valida persistência após interação.
5. Gates antes do commit único feat(storage): vitest verde + eslint limpo + vite build ok.
6. Push da branch → PR feature/local-storage-persistence→main → self-review via COMMENT → squash merge.