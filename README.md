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

O formulario aceita descricao opcional ate **500 caracteres**, com contador ao vivo:

| Uso | Cor |
| --- | --- |
| abaixo de 80% | verde |
| entre 80% e 99% | amarelo |
| limite atingido | vermelho |

O envio e bloqueado se a descricao exceder o limite.

### Outros recursos ja disponiveis

Tags filtraveis por tarefa · Atalhos N / Esc / setas · Views Hoje e Esta semana · Tema light/dark · Deploy no GitHub Pages.

## Como rodar

Requer Node 18+. Scripts do projeto (Vite):

code:bash
code:npm install     # instalar dependencias
code:npm run dev     # ambiente dev em http://localhost:5173
code:npm test        # testes unitarios (Vitest)
code:npm run build   # build de producao em dist/
code:npm run preview # servir o build localmente
code:
Deploy no GitHub Pages:

code:bash
code:npm run deploy  # predeploy roda npm run build; publica dist/ via gh-pages -d dist
code:
## Documentacao adicional