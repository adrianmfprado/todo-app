# ToDo App

App de lista de tarefas em **React**, exemplo prático dos recursos nativos da biblioteca (Context API, hooks), evoluído continuamente com features reais de produto.

## Stack

- React — UI baseada em componentes e hooks
- Vite — dev server e build
- Vitest + Testing Library — testes unitários
- Sass — estilos com temas light/dark
- gh-pages — deploy no GitHub Pages

## Funcionalidades

### Busca full-text com debounce

Digite no campo de busca para filtrar tarefas por **título, descrição e tags** (case-insensitive).

- Debounce de ~300ms: a busca dispara após você parar de digitar;
- Mínimo de ~3 caracteres para iniciar a filtragem;
- **Enter** aplica a busca imediatamente; **X** ou **Esc** limpa;
- Os trechos encontrados aparecem **destacados** nos resultados.

### Prioridades com badge e ordenação

Cada tarefa pode ter prioridade **alta**, **média** ou **baixa**, exibida como badge colorido no item.

1. Selecione a prioridade no formulário ao criar uma tarefa (padrão: média);
2. Use o seletor *Ordenar tarefas por prioridade* acima da lista para agrupá-las da mais alta para a mais baixa;
3. Tarefas sem prioridade válida ficam ao final da ordenação.

### Desfazer exclusão via snackbar