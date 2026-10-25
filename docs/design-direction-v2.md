# Direção Visual v2 — Profissional & Moderna

Fundação inalterada: `_tokens.scss` (DSv1). A v2 CONSOME os tokens existentes — não cria novos.

## Princípios

1. **Tokens como única fonte de verdade** — nenhuma cor/espaço/raio hardcoded fora dos tokens.
2. **Fluxo primeiro** — busca e filtros ACIMA da lista; formulário com hierarquia.
3. **Elevação sutil** — cards com `--shadow-sm`, hover `--shadow-md`; superfícies `--surface` sobre `--bg`.
4. **Motion discreto** — transições `--duration-fast` + `--ease-standard` em hover/focus/estado.
5. **Acessibilidade** — `:focus-visible` com focus-ring tokens; contraste AA; alvos de toque ≥ 44px.
6. **Responsivo de verdade** — container fluido `max-width: 720px`; breakpoints `--bp-sm/md/lg` via mixins.
7. **Dark theme de primeira classe** — todo estilo via tokens semânticos (`--surface`, `--text-*`, `--danger-*`).

## Padrões por componente

- **Topbar**: sticky, fundo `--surface`, sombra `--shadow-sm`, toggle de tema estilizado (sem emoji cru).
- **ViewTabs**: pills com estado ativo `--primary`; hover com transição.
- **AddTask**: card elevado; linha primária (título + botão adicionar); campos avançados em disclosure progressivo ("mais opções").
- **TaskItem**: card com borda `--border-subtle`; checkbox customizado; título riscado quando concluída; tags SEMPRE visíveis como chips (`--primary-100` bg); badges de prazo/prioridade padronizados; ações à direita com ícones acessíveis.
- **Subtasks**: painel recuado dentro do card, barra de progresso com `--secondary-500`.
- **Busca/Filtros**: barra única acima da lista, inputs consistentes 40px, raio pill.

## Anti-padrões proibidos na v2

Cores hardcoded · px fora dos tokens tipográficos · emoji como ícone de UI · sombra sem token · estilo duplicado entre arquivos.