# Plano de Implementação — UI Redesign v2

Branch de execução futura: `feat/ui-redesign-v2` (a partir da main atualizada).

## Fase 0 — Preparação (0.5h)

1. Criar branch `feat/ui-redesign-v2` a partir da `main`.
2. Rodar `npm test` e `npm run lint` para confirmar baseline verde.
3. Mapear classes CSS usadas nos componentes vs definidas no style.scss (checklist anti-regressão).

## Fase 1 — Estrutura de fluxo (RF1, RF5) (1h)

1. Reordenar home.js: ViewTabs → SearchBar → CategorySelect → TaskSection.
2. Extrair topbar do App.js para classes CSS (sem inline-style), sticky com sombra token.
3. Rodar testes unitários + e2e; corrigir seletores se necessário.

## Fase 2 — AddTask com hierarquia (RF3) (1h)

1. Estado `showAdvanced`; linha primária = título + botão adicionar.
2. Disclosure 'mais opções' para categoria/recorrência/data/prioridade/tags/descrição.
3. Payload do onAdd inalterado; testes que usam campos avançados abrem o disclosure primeiro.

## Fase 3 — TaskItem card-based (RF2) (1h)

1. Tags sempre visíveis como chips; highlight mantido na busca.
2. Checkbox customizado acessível; título riscado quando concluída; ações à direita.
3. Badges de prazo/prioridade padronizados com tokens de estado.

## Fase 4 — style.scss v2 (RNF1–RNF4) (2h)

1. Reescrever consumindo apenas tokens; remover duplicação C7.
2. Adicionar estilos ausentes: .priority-select, .task-inline-input, .task-tag, :focus-visible global, transições, elevação de cards.
3. Media queries via mixins nos breakpoints --bp-sm/md/lg; container fluido max-width 720px.
4. Validar visualmente light e dark em 360px, 768px e 1280px.

## Fase 5 — Verificação e merge (1h)

1. `npm run lint` limpo; `npm test` verde; `npm run test:e2e` verde.
2. Smoke manual: criar/checkar/editar/remover/subtasks/tags/prioridade/prazo/undo nos dois temas.
3. Push da branch → PR para main → code review → squash merge.
4. Atualizar docs/design-system.md se houver desvio apurado.

## Critério de pronto

Todos os critérios de aceite da spec atendidos e PR mergeada na main.