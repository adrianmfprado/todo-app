# Spec — UI Redesign v2 (SDD)

## 1. Visão geral

- **Objetivo**: aplicar o DSv1 ponta a ponta na UI do ToDo, corrigindo os problemas C1-C9 da revisão.
- **Escopo**: estilo + estrutura de layout dos componentes existentes. Sem mudança de lógica de negócio, sem novas dependências.
- **Fora de escopo**: substituição de ícones PNG (C11), refatoração de rotas/páginas, mudanças no ThemeContext.

## 2. Requisitos funcionais (RF)

| ID | Requisito |
|----|-----------|
| RF1 | Busca e filtro de categoria renderizam ACIMA da lista de tarefas |
| RF2 | Tags visíveis em todo TaskItem com tags, independente de busca ativa |
| RF3 | AddTask exibe linha primária (título + adicionar) e disclosure 'mais opções' para categoria/recorrência/data/prioridade/tags/descrição |
| RF4 | Container fluido com max-width 720px; layout utilizável em 360px+ |
| RF5 | Toggle de tema na topbar sticky com ícone acessível (aria-label) |

## 3. Requisitos não funcionais (RNF)

| ID | Requisito |
|----|-----------|
| RNF1 | Zero cores/medidas hardcoded fora dos tokens DSv1 |
| RNF2 | :focus-visible em todos os controles interativos com focus-ring tokens |
| RNF3 | Transições em hover/estado usando duration/ease tokens |
| RNF4 | Cards com elevação via shadow tokens; dark theme validado visualmente |
| RNF5 | Alvos de toque >= 44px em mobile (checkbox, botões, tabs) |

## 4. Mudanças por arquivo

- src/pages/home.js: reordenar render — ViewTabs, SearchBar, CategorySelect, depois TaskSection.
- src/components/AddTask.js: envolver campos avançados em estado showAdvanced; payload do onAdd idêntico ao atual.
- src/components/TaskItem.js: renderizar tags incondicionalmente quando existirem; manter highlight quando busca ativa.
- src/App.js: extrair header para topbar sticky estilizada via classes (sem inline-style).
- src/styles/style.scss: reescrever consumindo apenas tokens; remover duplicação C7; adicionar estilos ausentes (.priority-select, .task-inline-input, .task-tag); media queries via mixins nos breakpoints.

## 5. Critérios de aceite

1. Todos os testes unitários existentes passam sem alteração.
2. Testes e2e existentes passam sem alteração.
3. Lint limpo (npm run lint).
4. Verificação visual manual nos dois temas: light e dark.
5. Nenhuma regressão funcional: criar/checkar/editar/remover/subtasks/tags/prioridade/prazo/undo.

## 6. Riscos e mitigações

- **Risco**: reordenação do home.js quebrar seletores e2e dependentes da ordem DOM → mitigar conferindo seletores por role/label antes do merge.
- **Risco**: disclosure no AddTask esconder campos usados por testes → manter campos acessíveis no DOM quando aberto; testes que precisam deles devem abrir o disclosure primeiro.
- **Risco**: rewrite do style.scss regredir estilos não auditados → comparar classes usadas vs definidas antes do merge (checklist no plano).