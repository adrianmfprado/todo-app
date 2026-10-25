# Revisão e Crítica da UI — ToDo App

Base auditada: main @ #29. Método: leitura integral do código-fonte (App.js, home.js, AddTask.js, TaskItem.js, style.scss, _tokens.scss).

## Pontos fortes

- Design System v1 completo em _tokens.scss (tipografia, espaçamento, raios, z-index, motion).
- Tema claro/escuro funcional via ThemeContext + data-theme + localStorage.
- Features maduras: subtasks com progresso, prioridade rotulada, badges de prazo, tags com highlight na busca.
- Sass modularizado + testes unitários e e2e presentes.

## Problemas identificados

### Críticos

| ID | Problema | Evidência |
|----|----------|-----------|
| C1 | Busca e filtro de categoria renderizados ABAIXO da lista — fluxo invertido | home.js |
| C2 | Tags invisíveis fora do modo busca ativa | TaskItem: active && tags.length > 0 |
| C3 | AddTask flat sem hierarquia entre campos principais e avançados | AddTask.js |
| C4 | Sem responsividade real: container fixo 720px e inputs px fixos | style.scss |

### Altos

- C5: .priority-select sem estilo nenhum.
- C6: cores hardcoded (#fff, #E25C5C) ignorando tokens danger/inverted — quebram no dark.
- C7: tokens legados duplicados em _tokens.scss E style.scss (risco de drift).
- C8: zero elevação/motion apesar de shadow-* e duration-* prontos nos tokens.
- C9: nenhum :focus-visible apesar de focus-ring-* pronto.

### Médios

C10 checkbox nativo sem estilo; C11 ícones PNG raster; C12 px hardcoded fora dos tokens; C13 mistura rem/px/tokens; C14 edição por dblclick sem affordance; C15 header inline-style com botão emoji cru; classes usadas sem CSS (.task-inline-input, .task-tag).

## Conclusão honesta

A fundação é boa demais para estar subutilizada. O problema não é falta de design system — é falta de APLICAÇÃO dele somada a falhas estruturais de fluxo (C1/C3). A direção v2 mantém o DSv1 como fundação intocada e finalmente o aplica ponta a ponta.