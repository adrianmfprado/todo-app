# SDD - Correcao da identificacao de tarefas no onCheck (fix/check-by-id)

## 1 Contexto
O handler check em src/pages/useHomeHandlers.js localiza a tarefa comparando apenas title e muta o objeto direto no array de estado (target.checked = !target.checked).

## 2 Problema
- Duas tarefas com mesmo titulo sao indistinguiveis.
- Mutacao direta quebra imutabilidade esperada pelo React.
- Divergencia do padrao consolidado no PR #17 (taskOps.findTaskIndex).

## 3 Causas raiz
1 Identidade por campo nao unico (title) em vez de chave estavel (id).
2 Escrita in-place em vez de reconstrucao imutavel.
3 Handler anterior a padronizacao introduzida pelo undo-delete (#17).

## 4 Decisoes
- D1 Reuso: usar findTaskIndex(tasks,item) (por id primeiro, fallback titulo apenas se unico).
- D2 Imutabilidade: reconstruir lista via slice/substituicao por indice; nunca mutar objetos.
- D3 Recorrencias: proxima instancia gerada passa a receber id (Date.now()) e subtasks [], alinhando ao formato do onCreate e evitando regressao para fallback titulo.
- D4 Escopo: nenhum outro handler alterado; limitacoes pre-existentes da recurrence ficam como trabalho futuro.

## 5 Comportamento alvo
| Cenario | Resultado |
|---|---|
| Mesmo titulo x2 | Somente item clicado alterna |
| Item sem id, titulo unico | Funciona via fallback |
| Item inexistente | Estado inalterado |
| Recorrente marcada | Proxima instancia criada exatamente uma vez, com id |
| Recorrente desmarcada | Nenhuma instancia |
| Imutabilidade | Objetos originais preservados |

## 6 Plano de execucao
Branch fix/check-by-id -> spec -> testes TDD -> implementacao -> PR -> review -> merge squash.

## 7 Criterios de aceite
testes novos + existentes verdes; zero mutacao direta; PR mergeada na main.
