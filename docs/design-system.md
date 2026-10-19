# Design System — React ToDo (v1)

> Referência visual oficial do app. Toda tela, componente ou correção de estilo deve consumir os tokens e convenções abaixo.
> Identidade deliberada para um app de produtividade/tarefas: família fria azul-tinta/slate — silenciosa e focada no conteúdo. Proibido aqui o clichê cream quente #F4F1EA + terracota #D97757.

---

## 1. Auditoria do frontend (estado real do código)

Componentes em src/components: AddTask, Button, CategorySelect, ConfirmationModal, Counter, FunctionalCounter, SearchBar/SearchBar.js, SubtaskList, TaskItem, TaskList, TextInput.
Páginas em src/pages: home.js (HomePage), Login.js, User.js, routes.js.

### Quebrados / desestilizados / inconsistentes

| Onde | Classe(s) | Problema |
|---|---|---|
| App.js | .app-container | Wrapper raiz sem CSS; header do toggle de tema é todo inline |
| AddTask.js | .recurrence-select | Select sem estilo (aparência nativa do browser) |
| AddTask.js | .tag-input-group / .tag-input | Input de tags sem estilo |
| AddTask.js | .description-input-group / .description-input / .char-counter (+ warning/error) | Contador calcula classes mas nenhuma cor é aplicada — feedback visual morto |
| CategorySelect.js | .category-select | Select sem estilo |
| SearchBar/SearchBar.js | .search-bar (+ select interno) | Componente inteiro sem estilo |
| home.js | .filter-section (+ label "Filter by Category:") | Sem estilo e texto em inglês num app pt-BR |
| TaskItem.js | .overdue-badge "Atrasada" | Badge renderizada sem nenhum estilo |
| routes.js | .route-loading | Fallback do Suspense sem estilo |
| Login.js / User.js | — | Páginas vazias (h1 solto); fora do escopo .App ficam desestilizadas |

### Inconsistências estruturais

- Borda hardcoded #A09292 repetida em inputs/selects em vez de token.
- Raios ad-hoc convivendo: inputs/pills grandes usam raio 32px; subtask usa 16px; badges usam 12px.
- Fontes soltas: 13/14/16/20/24/48px sem escala tipográfica definida.
- Espaçamentos ad-hoc misturando px e rem arbitrários.
- Estilos aninhados sob .App: qualquer página fora da HomePage não herda nada.

---

## 2. Princípios da identidade

1. Frio e focado — neutros slate frios + azul-tinta como ação primária: o app parece uma ferramenta silenciosa que destaca a tarefa.
2. Hierarquia por peso e superfície — elevação sutil e tipografia carregam a hierarquia; cor fica reservada para estados e prioridade.
3. Compatibilidade progressiva — os tokens CSS existentes (--bg/--text/--primary/--primary-hover) continuam válidos e passam a apontar para os novos valores; adoção incremental sem quebra.
4. Acessibilidade AA como piso — todo par texto/fundo listado nasce com contraste >= 4.5:1 (texto normal) ou >= 3:1 (texto grande/UI).

---

## 3. Paleta nomeada (hex completo)

### 3.1 Neutros — Slate Tinta (matiz frio H~215)

| Token | Light | Dark |
|---|---|---|
| neutral-50 | #F7F9FB | #14171A |
| neutral-100 | #EEF2F6 | #1A1E23 |
| neutral-200 | #DDE5EC | #23282E |
| neutral-300 | #C3CFDA | #2C323A |
| neutral-400 | #9FAEBD | #383F48 |
| neutral-500 | #7C8DA0 | #4A525C |
| neutral-600 | #5A6B7E | #6B7480 |
| neutral-700 | #3E4E60 | #8B939D |
| neutral-800 | #26313E | #B4BBC3 |
| neutral-900 | #182029 | #DDE2E7 |

### 3.2 Primária — Azul-Tinta (ação principal, links, foco)

Matiz H~221, fria e profunda; evoca confiança e concentração.

| Token | Light | Dark |
|---|---|---|
| primary-100 (fundo suave) | #EEF2FE | #101C3A |
| primary-200 (fundo hover suave) | #DEEBFD | #16264E |
| primary-300 (bordas enfatizadas) | #BCD6FB | #1D3468 |
| primary-400 (ícones/acentos) | #89AFFF (uso em dark) | #4C6EF5 (uso em light) |
| primary-500 (base: botões, links, seleção ativa) | #3056D3 | #82AAFF |
| primary-600 (hover) | #24449C | #A5C2FF |
| primary-700 (active/pressed) | #16296B | #C6DAFF |

Mapeamento nos tokens legados: `--primary: var(--primary-500)`; `--primary-hover: var(--primary-600)`.

### 3.3 Secundária — Verde-Sálvia (confirmações, progresso positivo)

Matiz H~150 dessaturada; contraponto calmo ao azul.

| Token | Light | Dark |
|---|---|---|
| secondary-100 (fundo suave) | #ECF4EE | #0F1E17 |
| secondary-200 (fundo hover suave) | #DBEBDD | #16281D |
| secondary-300 (bordas enfatizadas) | #BCDCBF | #1E3829 |
| secondary-400 (ícones/acentos) | — em light use secondary-500; em dark use secondary-400 como base |-|
| secondary-500 (base: confirmação, progresso) | #78996B | #84AB98 |
| secondary-600 (hover) | #5F7D53 | #A1C4B0 |
| secondary-700 (active/pressed) | #4A6640 | #BCD8C6 |

### 3.4 Superfícies, texto e bordas (semânticos por tema)

| Papel | Light | Dark |
|---|---|---|
| canvas (fundo da página) — legado `--bg` | #F7F9FB (neutral-50) | #14171A |
| superfície elevada (cards, modais) | #FFFFFF | #1A1E23 |
| superfície afundada (inputs, trilhas) | #EEF2F6 (neutral-100) | #10131A |
| texto primário — legado `--text` | #111111 | #E6E9EC |
| texto secundário / labels | #444444 | #B8BEC5 |
| texto mudo (placeholders, metadados) | #777777 | #8B939D |
| texto invertido (sobre primária/secundária) | #FFFFFF sobre primary-500/secondary-500 light; #101C3A sobre primary-500 dark; #0F1E17 sobre secondary-500 dark |-|
| borda sutil (divisores, cards) | #DDE5EC (neutral-200) | #23282E |
| borda forte (contornos de input/select) — substitui o hardcoded #A09292 | #C3CFDA (neutral-300) | #2C323A |

### 3.5 Estados (feedback)

| Estado | Light bg / texto / borda | Dark bg / texto / borda |
|---|---|---|
| sucesso | #EBF7EF / #17643B / #B0E0C0 | #12291B / #86EFAC / #1D3B29 |
| alerta (warning) | #FDF3E1 / #955B0E / #EDAA3C | #2E2410 / #FCD34D / #443315 |
| erro/destrutivo | #FDECEC / #B22222 / #F0A9A9 | #2C1414 / #FCA5A5 / #4A2323 |
| info | fundo primary-100 com texto primary-700 (light); primary-200/primary-300 em dark |-|
| foco (ring visível) | outline 2px solid var(--primary-500), offset 2px, em ambos os temas |-|

### 3.6 Cores de prioridade (já existentes — mantidas, PR #15)

Tokens já mergeados em src/styles/priority.scss; o design system os adota como fonte da verdade:

| Prioridade | Light bg/texto | Dark bg/texto |
|---|---|---|
| alta | --priority-alta-bg: #FDE8E8 · --priority-alta-text: #B91C1C | --priority-alta-bg: #4A2323 · --priority-alta-text: #FCA5A5 |
| media | --priority-media-bg: #FEF3D9 · --priority-media-text: #B45309 | --priority-media-bg: #443315 · --priority-media-text: #FCD34D |
| baixa | --priority-baixa-bg: #E4F4EA · --priority-baixa-text: #15803D | --priority-baixa-bg: #1D3B29 · --priority-baixa-text: #86EFAC |

Badge correspondente: .task-priority-badge (pill, padding 2px 10px, raio 12px, 13px/600).

---

## 4. Tipografia

### Família (justificativa)

PT Sans (já carregada em fonts.scss) — humanista, desenhada para tela, com excelente legibilidade em tamanhos pequenos e personalidade mais calorosa que as neo-grotescas genéricas (Arial/Inter), sem perder a sobriedade de uma ferramenta de produtividade. Mantê-la evita custo de carregamento e preserva a continuidade visual do app.

- Corpo/UI e títulos: 'PT Sans', sans-serif
- Fallbacks: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
- Pesos autorizados: 400 (regular) e 700 (bold) — nada de pesos intermediários; hierarquia vem da escala + peso binário.
- Import atual (Google Fonts): ital,wght@0,400;0,700;1,400;1,700 — itálico reservado a ênfases editoriais.

### Escala modular

Razão ~1.25 (terça maior), base 16px — arredondada para valores inteiros estáveis:

| Token | Tamanho | Uso |
|---|---|---|
| text-xs | 13px (~0.8125rem) | badges, contadores, metadados |
| text-sm | 14px (~0.875rem) | legendas, texto auxiliar |
| text-base | 16px (1rem) | corpo padrão de UI |
| text-lg | 20px (1.25rem) | inputs destacados, subtítulos de seção |
| text-xl | 24px (1.5rem) | título de item de tarefa |
| text-2xl | 32px (2rem) | títulos de página secundária |
| text-4xl | 48px (3rem) | título principal da Home (h1) |

### Line-height

- Corpo e UI: 1.5 — legibilidade confortável em listas densas de tarefas.
- Títulos (text-xl e acima): 1.2 — blocos compactos e presence.
- Badges/pills: 1.4 (valor já usado no .task-priority-badge).

---

## 5. Espaçamento

Base 4px; escala multiplicativa — usar SOMENTE estes passos:

| Token | Valor | Uso típico |
|---|---|---|
| space-025 | 4px (0.25rem) | respiro interno mínimo, ícone-texto |
| space-05 | 8px (0.5rem) | gap entre elementos relacionados |
| space-075 | 12px (0.75rem) | padding de badges, gaps de formulário |
| space-1 | 16px (1rem) | padding padrão de cards/inputs |
| space-15 | 24px (1.5rem) | separação entre grupos |
| space-2 | 32px (2rem) | margem entre seções |
| space-3 | 48px (3rem) | respiro grande entre blocos |
| space-4 | 64px (4rem) | afastamento máximo (ex.: task-list da Home) |

Regra prática: paddings internos usam space-05 a space-15; margens entre componentes, space-1 a space-3; nada de valores fora da escala.

---

## 6. Raios (border-radius)

O app tem identidade pill/arredondada — preservada e formalizada:

| Token | Valor | Uso |
|---|---|---|
| radius-xs | 4px | trilhas de progresso finas |
| radius-sm | 8px | checkboxes customizados, tooltips |
| radius-md | 12px | badges/pills pequenos (.task-priority-badge, .subtask-badge) |
| radius-lg | 16px | inputs compactos (subtask-add), painéis internos |
| radius-xl | 32px | inputs e botões principais (task-name-input, btn.add, selects) — assinatura visual do app |
| radius-pill | 9999px | pílulas puras (view-filter-btn) |
| radius-circle | 50% | avatares, dots |

---

## 7. Sombras e elevação

Sombras frias (tingidas de slate, nunca pretas puras), discretas — a hierarquia vem do contraste de superfície:

| Token | Valor (light) | Valor (dark) |
|---|---|---|
| shadow-sm | 0 1px 2px rgba(24,32,41,0.08) | 0 1px 2px rgba(0,0,0,0.45) |
| shadow-md | 0 2px 8px rgba(24,32,41,0.12) | 0 2px 8px rgba(0,0,0,0.55) |
| shadow-lg | 0 8px 24px rgba(24,32,41,0.16) | 0 8px 24px rgba(0,0,0,0.65) |

Uso: shadow-sm em itens de lista elevados; shadow-md em dropdowns/popovers; shadow-lg em modais (ConfirmationModal). Em dark theme prefira elevar por clareza de superfície (neutral-800 sobre neutral-900) e use sombra apenas como reforço.

### Z-index

| Camada | Valor |
|---|---|
| base/conteúdo | auto |
| dropdown/popover | 10 |
| sticky (headers fixos) | 20 |
| overlay/backdrop | 30 |
| modal (ConfirmationModal) | 40 |
| toast/snackbar (SnackBar undo) | 50 |

---

## 8. Breakpoints

Mobile-first:

| Token | Largura | Alvo |
|---|---|---|
| sm | 480px | celulares grandes |
| md | 768px | tablets — a partir daqui o container de 720px cabe sem scroll horizontal |
| lg | 1024px | desktops pequenos |
| xl | 1280px | desktops — container pode expandir para 960px se houver layout de duas colunas |

Nota: o container atual é fixo em 720px; ao introduzir responsividade, usar max-width + padding lateral (space-1 em mobile) em vez de width fixa.

---

## 9. Motion

### Durações

| Token | Valor | Uso |
|---|---|---|
| duration-instant | 100ms | feedback de hover/press |
| duration-fast | 150ms | fades, toggles pequenos |
| duration-base | 250ms | transições padrão (painéis, badges) |
| duration-slow | 400ms | entradas de página, modais |

### Easings

| Token | Valor | Uso |
|---|---|---|
| ease-standard | cubic-bezier(0.2, 0, 0, 1) | transições padrão (entrada e saída) |
| ease-entrance | cubic-bezier(0, 0, 0.2, 1) (decelerate) | elementos que entram na tela |
| ease-exit | cubic-bezier(0.4, 0, 1, 1) (accelerate) | elementos que saem da tela |

Regras: animar apenas transform e opacity (compositáveis); respeitar prefers-reduced-motion desativando transições não essenciais; a barra de progresso de subtarefas já usa width 0.3s ease — migrar para duration-base + ease-standard quando tocada.

---

## 10. Foco visível e acessibilidade

- Foco: todo elemento interativo recebe `outline: 2px solid var(--primary-500); outline-offset: 2px` no estado `:focus-visible` — nunca remover outline sem substituir por alternativa visível.
- Contraste AA mínimo: texto normal >= 4.5:1; texto grande (>=24px ou >=18.7px bold) e componentes de UI/bordas significativas >= 3:1. Pares garantidos pela paleta: texto primário sobre canvas, #FFFFFF sobre primary-500 light (~7:1), primary-700 sobre primary-100.
- Alvos de toque >= 44x44px em mobile.
- Estados warning/error do contador de caracteres DEVEM usar as cores da seção 3.5 (hoje calculadas no JSX mas nunca estilizadas).

---

## 11. Convenções de nomenclatura de classes

Padrão atual do projeto (BEM-lite): `bloco`, `bloco-elemento`, `bloco-elemento--modificador` quando houver variante visual; estados binários usam classe simples (`.active`, `.overdue`, `.done`).

| Padrão | Exemplos existentes a manter |
|---|---|
| bloco | .add-task, .task-list, .subtask-list, .search-bar |
| bloco-elemento | .task-list-item-title, .subtask-progress-bar |
| estado simples | .active (view-filter-btn), .overdue (task-list-item), .done (subtask) |
| componente genérico reutilizável | .btn + modificador (.btn.add); TextInput recebe classe via prop |

Regras para novos estilos:
1. Nenhum estilo novo fora de arquivo SCSS importado por src/index.js — nada de style inline exceto o header do tema (a migrar).
2. Novos blocos entram em src/styles/<bloco>.scss com o mesmo padrão do priority.scss.
3. Cores/raios/espaçamentos só via tokens CSS custom properties definidos em :root[data-theme].

---

## 12. Mapa dos arquivos de estilo

| Arquivo | Conteúdo | Status |
|---|---|---|
| src/styles/fonts.scss | @import da família PT Sans (Google Fonts) | existente |
| src/styles/style.scss | tokens legados (--bg/--text/--primary/--primary-hover por tema), reset, layout .App/.container, view-filter, add-task, task-list, subtasks | existente — migrar valores para os tokens da seção 3 |
| src/styles/priority.scss | tokens de prioridade + badge + selects de prioridade | existente — mantido como fonte da verdade das prioridades |
| src/index.js | ponto de import dos SCSS (ordem: fonts, style, priority) | existente |
| docs/design-system.md | este documento — fonte da verdade conceitual dos tokens | novo nesta branch |

Pendências conhecidas fora do escopo deste doc (registradas na auditoria): estilizar .recurrence-select, .tag-input, .description-input/.char-counter, .category-select, .search-bar, .filter-section, .overdue-badge, .route-loading e as páginas Login/User — a fazer em PRs seguintes consumindo este design system.
 