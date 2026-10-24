import { test, expect } from '@playwright/test';

// Fluxos de prioridade e filtro por tags via UI real.

const TITLE_INPUT = 'digite o título da tarefa...';
const ADD_BUTTON = /adicionar tarefa/i;
const TAGS_INPUT = 'Adicionar tags (separadas por vírgula)';

async function addTask(page, title) {
  await page.getByPlaceholder(TITLE_INPUT).fill(title);
  await page.getByRole('button', { name: ADD_BUTTON }).click();
}

test.describe('Prioridade', () => {
  test('adiciona tarefa com prioridade alta e badge visível', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder(TITLE_INPUT).fill('Urgente');
    await page.getByLabel('Prioridade da tarefa').selectOption('alta');
    await page.getByRole('button', { name: ADD_BUTTON }).click();

    const item = page.locator('.task-list-item').filter({ hasText: 'Urgente' });
    await expect(item.locator('.task-priority-badge')).toHaveText('Alta');
  });

  test('ordena por prioridade (alta primeiro) via select do TaskList', async ({ page }) => {
    await page.goto('/');
    // Ordem de inserção: baixa (padrão média? não — padrão é média), depois alta
    await addTask(page, 'Tarefa baixa');
    await page.getByPlaceholder(TITLE_INPUT).fill('Tarefa alta');
    await page.getByLabel('Prioridade da tarefa').selectOption('alta');
    await page.getByRole('button', { name: ADD_BUTTON }).click();

    // Sem ordenação: ordem de inserção preservada
    let titles = page.locator('.task-list-item-title');
    await expect(titles.nth(0)).toHaveText('Tarefa baixa');
    await expect(titles.nth(1)).toHaveText('Tarefa alta');

    // Ativa ordenação por prioridade: alta vai para o topo
    await page.getByLabel('Ordenar tarefas por prioridade').selectOption('priority');
    titles = page.locator('.task-list-item-title');
    await expect(titles.nth(0)).toHaveText('Tarefa alta');
    await expect(titles.nth(1)).toHaveText('Tarefa baixa');
  });
});