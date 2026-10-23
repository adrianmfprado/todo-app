import { test, expect } from '@playwright/test';

// Fluxos de prioridade e filtro por tags via UI real.

const TITLE_INPUT = 'digite o título da tarefa...';
const ADD_BUTTON = /adicionar tarefa/i;

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
    await expect(item.locator('.task-priority-badge')).toHaveText('Alta'); })r;r