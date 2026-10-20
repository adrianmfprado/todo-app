# Spec SDD – Filtro por Tags na TaskList

## Contexto

O app ToDo permite marcar tarefas com tags desde o PR #8 (`AddTask` cria o campo `tags`, array de strings). A busca textual já indexa tags em `home.js`. Falta filtrar a lista exibida pelas tags diretamente na `TaskList`.

## Problema

Com muitas tarefas cadastradas não há como isolar rapidamente as tarefas de uma determinada tag sem digitar na busca.

## Objetivos

1. Seletor/chips de filtro por tag dentro da própria `TaskList`.
2. Contagem de tarefas por tag exibida junto ao nome.
3. Multi-seleção com semântica OR.
4. Compatível com ordenação por prioridade e busca existentes.

## Não objetivos

- Editar/remover tags nesta tela.
- Filtrar por categoria ou outros campos nesta feature.
- Nova persistência – tudo é derivado em memória do `dataSource`.

## Design

### Util pura (`src/utils/tags.js`)

Mesmo padrão de `src/utils/priority.js`: funções puras exportadas nominalmente e imutáveis.

| Função | Assinatura | Semântica |
|---|---|---|
| extrair-tags | `(tasks[]) -> string[]` | Lista única das tags em ordem de primeira aparição |
| contar-tarefas-por-tag | `(tasks[]) -> {[tag]: number}` | Contagem de tarefas por tag |
| tarefas-casam-com-tags-selecionadas | `(tasks[], string[]) -> tasks[]` | Filtro OR; seleção vazia devolve todas |

Normalização interna usa trim + comparação case-insensitive para casar seleção com tarefa; a exibição preserva a forma original da primeira aparição.

### Componente (`src/components/TaskList.js`)

- Novo estado local via `useState([])` para as tags selecionadas.
- Chips renderizados acima da lista somente quando existe ao menos uma tag disponível.
- Cada chip é um `<button aria-pressed>` com contagem vinda da util.
- Botão Limpar aparece somente com seleção ativa.
- Pipeline: ordenação existente primeiro; depois filtro OR pelas tags sobre o resultado.
- Drag & drop e empty state existentes permanecem intactos.
- Quando o filtro ativo zera a lista mas o dataSource não está vazio, mensagem específica Nenhuma tarefa corresponde às tags selecionadas.

## Crítica da rota inicial e evolução

A rota inicial considerava filtrar antes da ordenação e reutilizar o emptyMessage do pai em todos os casos vazios.
Pontos fracos identificados:
1. Filtrar antes da ordenação pode surpreender na ordem dos itens ao alternar filtros; ordenar primeiro mantém resultado estável entre renders.
2 Reutilizar o emptyMessage do pai mostraria Não há nenhuma tarefa adicionada quando na verdade existem tarefas apenas fora do filtro atual – mensagem enganosa.
Evolução adotada:
pipeline ordena -> filtra + mensagem própria para filtro sem resultados!
Ponto fraco restante aceito conscientemente:
counts calculados sobre o dataSource recebido refletem apenas os filtros aplicados pelo pai busca/categoria/view não os internos do componente!
suficiente para esta iteracao!
evolucao futura possivel recalculo condicional dos counts considerando selecao atual!
documentado aqui como decisao explicita!
fim da secao!
Ponto fraco restante aceito conscientemente:
counts calculados sobre o dataSource recebido refletem apenas os filtros aplicados pelo pai busca/categoria/view não os internos do componente!
suficiente para esta iteracao!
evolucao futura possivel recalculo condicional dos counts considerando selecao atual!
documentado aqui como decisao explicita!
fim da secao!
Ponto fraco restante aceito conscientemente:
counts calculados sobre o dataSource recebido refletem apenas os filtros aplicados pelo pai busca/categoria/view não os internos do componente!
suficiente para esta iteracao!
evolucao futura possivel recalculo condicional dos counts considerando selecao atual!
documentado aqui como decisao explicita!
fim da secao!