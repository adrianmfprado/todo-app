# SDD - Varredura de Acessibilidade com axe-core na Suite E2E

Data: 2026-11-02
Status: Proposto
Escopo: testes automatizados de acessibilidade nas páginas e fluxos já cobertos pela suíte E2E do todo-app.

## 1. Objetivo

Detectar regressões de acessibilidade automaticamente durante os testes E2E com Playwright usando @axe-core/playwright.
O teste deve falhar quando o axe encontrar violações de impacto critical ou serious nas telas varridas.
Violações moderate/minor não devem falhar o build; devem ser documentadas com rota de correção proposta.

## 2. Contexto

App ToDo List em React.js como SPA single-page.
Suíte E2E existente em tests/e2e cobre CRUD de tarefas, busca e filtro por tags sempre partindo da home via page.goto('/').
Tema claro/escuro persistido no localStorage sob a chave 'theme' (constante THEME_STORAGE_KEY exportada por src/theme.js).
devDependency @axe-core/playwright já instalada.
baseURL configurada em playwright.config.ts como http://localhost:4318/todo-app/

## 3. Decisões de Design

| ID | Decisão | Justificativa |
|----|---------|---------------|
| D1 | Usar @axe-core/playwright | Integração nativa com o Playwright já usado pelo projeto |
| D2 | Falhar apenas com impacto critical ou serious | Falha somente em problemas que quebram uso real |
| D3 | Filtrar por nível de impacto e não por lista fixa de regras | Suíte resiliente a novas regras adicionadas pelo axe |
| D4 | Regras default do axe WCAG A/AA + best practices | Escopo suficiente para um app exemplar |
| D5 | Varredura por estado da página e não por rota | App é SPA single-page |
| D6 | Chave 'theme' lida da constante THEME_STORAGE_KEY ao simular tema escuro | Evita duplicar literal e mantém acoplamento com src/theme.js |

## 4. Pontos de Varredura

V1 - Home tema claro default estado base.
V2 - Home tema escuro setando localStorage.setItem('theme','dark') via page.addInitScript antes do goto('/').
V3 - Home com tarefas populadas criando tarefas via UI antes da varredura valida contraste e estrutura semântica dos itens da lista.

## 5. Regra de Falha

Após cada varredura o teste filtra results.violations mantendo apenas as que possuem impact igual a critical ou serious.
Se essa lista não estiver vazia o expect falha comparando com lista vazia.
A mensagem exibida deve listar para cada violação o id da regra o nível de impacto e os seletores dos nós afetados para acelerar o diagnóstico.
Pontualmente se uma regra gerar falso positivo confirmado usar disableRules na chamada do AxeBuilder acompanhado de comentário explicando o motivo.

## 6. Critérios de Aceite

CA1 - Nova spec tests/e2e/axe-a11y.pw.spec.ts executa o AxeBuilder nos 3 pontos de varredura (V1, V2, V3).
CA2 - O teste falha se qualquer violação critical ou serious for encontrada, exibindo id da regra, impacto e seletores.
CA3 - A suíte roda no comando Playwright existente (npm run test:e2e) sem configuração adicional além da devDependency @axe-core/playwright.
CA4 - Violações moderate/minor encontradas na primeira execução são documentadas em docs/specs com rota de correção proposta.
CA5 - Mudanças entregues via branch dedicada com PR em squash merge na main.

## 7. Riscos e Mitigações

R1 - Falso positivo de regra pontual: mitigar com disableRules na chamada do AxeBuilder acompanhado de comentário explicando o motivo.
R2 - Browsers do Playwright ausentes no sandbox local: validação funcional depende do pipeline de CI; localmente valida-se sintaxe e lint.
R3 - Divergência entre tema simulado e tema real: mitigado ao reutilizar a constante THEME_STORAGE_KEY exportada por src/theme.js.

## 8. Documentação de Violações Não Bloqueantes

Se a primeira execução revelar violações moderate/minor, elas devem ser registradas nesta seção com id da regra, impacto, nós afetados e rota de correção proposta (seguindo o fluxo SDD/TDD do objetivo). Nenhuma violação registrada até a criação desta spec; atualizar após a primeira execução em CI.