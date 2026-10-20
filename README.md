# ToDo App

App de lista de tarefas em **React**, exemplo pratico dos recursos nativos da biblioteca (Context API, hooks), evoluído continuamente com features reais de produto.

## Stack

- React - UI baseada em componentes e hooks
- Vite - dev server e build
- Vitest + Testing Library - testes unitarios
- Sass - estilos com temas light/dark
- gh-pages - deploy no GitHub Pages

## Funcionalidades

### Busca full-text com debounce

Digite no campo de busca para filtrar tarefas por **titulo, descricao e tags** (case-insensitive).

- Debounce de ~300ms: a busca dispara apos voce parar de digitar;
- Minimo de ~3 caracteres para iniciar a filtragem;
- **Enter** aplica a busca imediatamente; **X** ou **Esc** limpa;
- Os trechos encontrados aparecem **destacados** nos resultados.

### Prioridades com badge e ordenacao

Cada tarefa pode ter prioridade **alta**, **media** ou **baixa**, exibida como badge colorido no item.

1. Selecione a prioridade no formulario ao criar uma tarefa (padrao: media);
2. Use o seletor *Ordenar tarefas por prioridade* acima da lista para agrupa-las da mais alta para a mais baixa;
3. Tarefas sem prioridade valida ficam ao final da ordenacao.

### Desfazer exclusao via snackbar

Ao remover uma tarefa, uma snackbar surge com botao *Desfazer*:

1. Clique em *Desfazer* dentro dos **5 segundos** para restaura-la;
2. A tarefa volta exatamente a posicao original da lista;
3. Sem acao apos os 5s? A exclusao se torna definitiva.

### Descricao com contador e validacao

O campo de descricao aceita ate **500 caracteres**, com contador colorido em tempo real:

- Verde: abaixo de 80% do limite;
- Amarelo: 80% ou mais do limite;
- Vermelho: limite atingido - o envio do formulario e bloqueado.

## Outros recursos

- Tags filtraveis por tarefa;
- Atalhos de teclado: **N** (nova tarefa), **Esc**, setas para navegacao;
- Views *Hoje* e *Esta semana*;
- Temas light/dark.

## Como rodar

Requisitos: Node 18+.

    npm install
    npm run dev      # servidor de desenvolvimento (Vite)
    npm test         # testes unitarios (Vitest)
    npm run build    # build de producao
    npm run preview  # preview do build localmente
    npm run deploy   # publica no GitHub Pages (gh-pages)

## Documentacao adicional

Referencias complementares na raiz do repositorio:

    components-reference.md     # referencia dos componentes React usados no app; detalha props e responsabilidades.
    SDD_FULL_TEXT_SEARCH.md     # especificacao completa da feature busca full-text; detalha decisões arquiteturais.
    docs/                       # pasta complementar.