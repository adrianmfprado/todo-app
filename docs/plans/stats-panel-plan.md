# Plano de Implementação - Painel de Estatísticas (Home)

## Objetivo
Adicionar seção de resumo na HomePage com contadores de tarefas totais / pendentes / concluídas / atrasadas.

## Etapas

### Etapa 1 - Testes primeiro (TDD)
Criar testes do util puro computeStats cobrindo:
- lista vazia ou ausente retorna zeros;
- pendentes = checked === false;
- concluídas = checked === true;
- atrasadas = pendentes com getDeadlineStatus(dueDate,false) === 'overdue';
- tarefa concluída com prazo vencido NÃO conta como atrasada;
- tarefa sem dueDate nunca é atrasada;
- itens nulos ou inválidos são ignorados individualmente.

### Etapa 2 - Util computeStats
Implementar função pura em src/utils/computeStats.js retornando {total,pending,completed,overdue}.
Entrada defensiva e cálculo isolado fora do componente.

### Etapa 3 - Componente StatsPanel
Criar componente render puro recebendo stats via props.
Container role=status aria-live=polite com rótulos visíveis junto aos números.
Estilos consumindo apenas tokens de _tokens.scss e responsivo a partir de 360px.

### Etapa 4 - Integração na HomePage
Injetar <StatsPanel stats={computeStats(taskList)} /> acima das ViewTabs.
Sem alteração no comportamento dos filtros e da lista existentes.

### Etapa 5 - Suíte de testes
Rodar vitest run via shell e corrigir falhas até verde.

### Etapa 6 - Publicação
Subtarefa dedicada ao concluir desenvolvimento:
git add + commit na feature/stats-panel -> push origin -> PR para main -> code review -> merge.