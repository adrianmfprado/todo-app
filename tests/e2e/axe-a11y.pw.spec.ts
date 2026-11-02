import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { THEME_STORAGE_KEY } from '../../src/theme';

// Varredura de acessibilidade (axe-core) nos estados já cobertos pela suíte E2E.
// Falha apenas com violações de impacto critical ou serious.
// Design e critérios em docs/specs/axe-a11y-sdd.md.

const BLOCKING_IMPACTS = ['critical', 'serious'];

async function scanForBlockingViolations(page) {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.filter((v) => BLOCKING_IMPACTS.includes(v.impact));
}

function formatViolations(violations) {
  return violations
    .map(
      (v) =>
        v.id +
        ' (' +
        v.impact +
        '): ' +
        v.nodes
          .map((n) => n.target.join(' '))
          .join('; '),
    )
    .join('\n');
}

test.describe('Acessibilidade - varredura axe-core', () => {
  // V1 - home em tema claro (default)
  test('home em tema claro sem violações critical/serious', async ({ page }) => {
    await page.goto('/');

    const blocking = await scanForBlockingViolations(page);

    expect(blocking, formatViolations(blocking)).toEqual([]);
  });

  // V2 - home em tema escuro via localStorage antes do carregamento
  test('home em tema escuro sem violações critical/serious', async ({ page }) => {
    // Usa a mesma chave persistida pelo ThemeProvider (src/theme.js)
    await page.addInitScript(
      ([key]) => {
        window.localStorage.setItem(key, 'dark');
      },
      [THEME_STORAGE_KEY],
    );

    await page.goto('/');

    const blocking = await scanForBlockingViolations(page);

    expect(blocking, formatViolations(blocking)).toEqual([]);
  });

  // V3 - home com tarefas populadas via UI (valida contraste e semântica dos itens)
  test('home com tarefas populadas sem violações critical/serious', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('digite o título da tarefa...').fill('Comprar leite');
    await page.getByRole('button', { name: /adicionar tarefa/i }).click();
    await expect(
      page.locator('.task-list-item').filter({ hasText: 'Comprar leite' }),
    ).toHaveCount(1);

    const blocking = await scanForBlockingViolations(page);

    expect(blocking, formatViolations(blocking)).toEqual([]);
  });
});