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

Ao remover uma tarefa, uma snackbar surge com botão *Desfazer*:

1. Clique em *Desfazer* dentro dos **5 segundos** para restaurá-la;
2. A tarefa volta exatamente à posição original da lista;
3. Sem ação após os 5s? A exclusão se torna definitiva.

### Descrição com contador e validação

O formulário aceita descrição opcional até **500 caracteres**, com contador ao vivo:

| Uso | Cor |
| --- | --- |
| abaixo de 80% | verde |
| entre 80% e 99% | amarelo |
| limite atingido | vermelho |

O envio é bloqueado se a descrição exceder o limite.

### Outros recursos já disponíveis