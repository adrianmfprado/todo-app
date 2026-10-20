# ToDo App

App de lista de tarefas em **React**, exemplo pratico dos recursos nativos da biblioteca (Context API, hooks), evoluído continuamente com features reais de produto.

## Stack

- React — UI baseada em componentes e hooks
- Vite — dev server e build
- Vitest + Testing Library — testes unitarios
- Sass — estilos com temas light/dark
- gh-pages — deploy no GitHub Pages

## Funcionalidades

### Busca full-text com debounce

Digite no campo de busca para filtrar tarefas por **titulo, descricao e tags** (case-insensitive).

- Debounce de ~300ms: a busca dispara apos voce parar de digitar;
- Minimo de ~3 caracteres para iniciar a filtragem;
- **Enter** aplica a busca imediatamente; **X** ou **Esc** limpa;
- Os trechos encontrados aparecem **destacados** nos resultados.

### Prioridades com badge e ordenacao