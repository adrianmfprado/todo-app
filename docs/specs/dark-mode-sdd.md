# Dark Mode Spec (SDD)

## Visão Geral
O app suporta modo escuro usando tokens DSv1; o tema é controlado pelo atributo `data-theme` no `<html>`.

## Requisitos Funcionais
- **Persistência**: tema salvo em localStorage (chave `theme`).
- **Fallback**: sem valor salvo, deriva de `window.matchMedia('(prefers-color-scheme: dark)')`.
- **Toggle**: botão na topbar alterna light ↔ dark.
- **Tokens**: estilos definidos em `_tokens.scss` via `[data-theme="light"]` e `[data-theme="dark"]`.
- **Acessibilidade**: botão com `aria-label="Toggle theme"` e foco visível.

## Fluxo
App → ThemeProvider/ThemeContext (`theme`, `toggle`) → Topbar consome via context.

## Testes de Aceitação
1. Abrir sem localStorage → tema segue `prefers-color-scheme`.
2. Clicar no toggle troca `data-theme` e atualiza localStorage.
3. Botão exibe ícone SVG correspondente ao tema.