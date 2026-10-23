# Spec SDD — Suíte e2e/smoke Playwright · ToDo app

Data: 2026-10-21 · Status: especificação (nada implementado nesta fase) · Repo: https://github.com/adrianmfprado/todo-app · Clone canônico: todo-app-fresh @ main, HEAD 67475557df03377377bf73dc23756b10662de62c, árvore limpa.

## Objetivo
Suíte Playwright cobrindo os fluxos principais do app como rede de regressão pré-merge na main.

## Escopo — fluxos validados contra o código real
- A Adicionar tarefa (AddTask): título obrigatório (placeholder 'digite o título da tarefa...'), categoria padrão Personal, recorrência (Não repete/Diária/Semanal/Mensal), data (.task-due-date), tags por vírgula (.tag-input), prioridade (select.priority-select aria-label 'Prioridade da tarefa', padrão Média), descrição até 500 chars com contador (.char-counter; warning >=80%, error =100%). Botão 'adicionar tarefa' (Button.add).
- B Conclusão (TaskItem): checkbox .task-list-item-checkbox controlado por item.checked via onCheck.
- C Editar tarefa: NÃO EXISTE no produto — nenhum handler de edição em home/useHomeHandlers/taskOps. GAP registrado; fora da suíte até a feature existir.
- D Excluir (TaskItem): botão com img[alt='remove task'] chama onRemove; soft-delete posicional em useUndoDelete.
- E Desfazer exclusão (SnackBar): .undo-snackbar role=status aria-live=polite; botão .undo-snackbar-action 'Desfazer'; expira em UNDO_DURATION_MS = 5000 ms (corrigido: memória antiga dizia 50s — valor real é 5s).
- F Filtros: ViewTabs (role=tablist; tabs Todas/Hoje/Esta semana), categoria (.filter-section CategorySelect), busca full-text (SearchBar #todo-search-input; debounce 300ms; mínimo 3 chars; Enter imediato; Escape/X limpam; destaca via HighlightText em título/descrição/tags). RISCO: o select 'Filtrar por status' do SearchBar emite onFilterChange que home.js descarta ((value) => {}) — filtro de status está desconectado no produto.
- G Reordenar drag-and-drop nativo HTML5 (TaskList): wrappers .task-list-item-wrapper draggable; classe .drag-over no alvo; desabilitado quando sortMode=priority ou sem onReorder.
- H Prioridades: badges .task-priority-badge.task-priority-{alta|media|baixa}; ordenação estável alta→baixa via sortByPriority no select.priority-sort-select ('Ordem padrão' / 'Prioridade (alta primeiro)').

## Seletores — estratégia
Sem data-testid no produto hoje. Usar seletores estáveis existentes: classes semânticas listadas acima, aria-label/role acessíveis e texto visível pt-BR. Recomenda-se ADICIONAR data-testid apenas se um seletor se provar frágil — como melhoria futura em PR própria, nunca acoplada à suíte.

## Critérios de aceite
1. Suíte roda contra dev server Vite (http://localhost:5173) via webServer do Playwright.
2. Fluxos A, B, D, E, F(views+categoria+busca), G, H cobertos por testes independentes e determinísticos.
3. Teste E valida undo antes e expiração após ~5s (tolerância de clock).
4. Busca respeita debounce/mínimo de chars e estado vazio ('Nenhuma tarefa encontrada para ...').
5. Zero dependência de ordem entre testes; estado limpo por teste (localStorage/persist quando aplicável).
6. npm run test:e2e verde localmente antes do PR.

## Riscos e limitações
- Sem data-testid: dependência de classes/texto pode quebrar com refactors de estilo.
- Drag-and-drop HTML5 nativo é instável em headless — usar dispatchEvent de DragEvent ou mouse API do Playwright com fallback documentado.
- Timer de undo exige espera explícita (~5s) ou fake clock; evitar sleeps fixos longos além desse caso.
- Filtro de status desconectado (bug potencial) — não testar como funcionalidade até decisão do owner.
- React 17 + Vite 5: sem conflitos previstos com @playwright/test atual.

## Pendências para a próxima subtarefa (implementação)
1. Instalar @playwright/test + browsers; script test:e2e no package.json.
2. playwright.config.ts com webServer (vite dev) e baseURL localhost:5173.
3. Implementar testes dos fluxos acima em tests/e2e/ seguindo esta spec (TDD).
4. Branch feature/e2e-playwright-suite → PR → merge na main após revisão.