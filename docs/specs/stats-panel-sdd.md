# SDD — Painel de Estatísticas (Home)

## Visão Geral
Seção fixa na HomePage com contadores-resumo da taskList: total, pendentes, concluídas e atrasadas.

## Requisitos Funcionais
- RF01: Total = número de tarefas da lista.
- RF02: Pendentes = tarefas com checked === false.
- RF03: Concluídas = tarefas com checked === true.
- RF04: Atrasadas = pendentes com getDeadlineStatus(dueDate, false) === 'overdue'.
- RF05: Painel reflete mudanças em taskList automaticamente.

## Regras
- Tarefa concluída nunca é atrasada.
- Tarefa sem dueDate nunca é atrasada.
- Lista vazia/ausente => todos os contadores zerados.
- Itens nulos/inválidos são ignorados individualmente.

## Requisitos Não-Funcionais
- Estilo apenas com tokens de _tokens.scss.
- Responsivo a partir de 360px.
- Acessibilidade: container com role="status" e aria-live="polite"; rótulos visíveis junto aos números.
- Cálculo puro isolado em util (computeStats), fora do componente.
- Sem alteração de comportamento nos filtros/lista existentes.

## Arquitetura
HomePage(taskList) -> <StatsPanel stats={computeStats(taskList)} /> -> render puro dos contadores.