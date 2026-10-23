# SDD - Prazos das tarefas (feature/due-dates)

Data da especificacao em codigo-fonte unica para toda a feature.

## Contexto
Tarefas nao possuem data de vencimento confiavel hoje.
Problemas identificados:

* formato misto entre produtores/consumidores
* badge unico Atrasada calculado com parse local propenso a fuso
* sem ordenacao por prazo nem edicao do campo apos criacao

## Objetivos
* campo dueDate canonico AAAA-MM-DD em toda a aplicacao
* badge visual tres estados vence-hoje/atrasado/futuro
* edicao inline por duplo-clique alinhada ao padrao inline-edit consolidado
* opcao ordenar por prazo seguindo padrao priority-sort-select

## Nao objetivos
* modal de edicao dedicada descartada por conflito com duplo-clique inline-edit consolidado
* notificacoes ou lembretes externos fora do escopo atual

## Decisoes de design
### D1 Formato canonico AAAA-MM-DD string comparada lexicograficamente sem parse de timezone em nenhum ponto do caminho novo.
### D2 Util deadlineUtils puro exporta DEADLINE_STATUS overdue/today/future getDeadlineStatus raw isDone retorna null para concluida ou sem prazo e sortByDeadline estavel nao mutante enviando sem-prazo para o fim.
### D3 Badge em TaskItem classes .due-overdue .due-today .due-future mantendo wrapper .overdue para compatibilidade com CSS legado.
### D4 Edicao inline duplo-clique no chip abre input type date Enter ou blur commitam onUpdate id dueDate Esc cancela valor vazio limpa o prazo.
### D5 TaskList opcao value due aplica sortBy Deadline e desabilita drag-and-drop igual ao comportamento da ordenacao por prioridade.
### D6 createNextInstance grava toDateStr garantindo AAAA-MM-DD consistente com dateFilters isToday isThisWeek eliminando o formato misto.
