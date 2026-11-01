# Dark Mode Plan

Branch: feature/dark-mode · Base: main · Spec: docs/specs/dark-mode-sdd.md

## Passos
1. Ler src/theme.js e mapear wiring atual de data-theme/topbar.
2. Hook src/hooks/useTheme(.js): estado inicial localStorage('theme') → fallback matchMedia prefers-color-scheme; toggle alterna e persiste; aplica document.documentElement.setAttribute('data-theme', value).
3. Wire do botão .theme-toggle na Topbar com aria-label="Toggle theme" e ícones SVG sol/lua conforme tema.
4. Testes vitest cobrindo fallback/persistência/toggle/documentElement.
5. Critérios de aceite antes do commit único feat(theme): vitest verde + eslint limpo + vite build ok.
6. Push da branch → PR feature/dark-mode→main → self-review → squash merge.