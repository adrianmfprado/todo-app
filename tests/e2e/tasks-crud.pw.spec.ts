import { test, expect } from '@playwright/test';

// Fluxos principais de CRUD de tarefas via UI real (dev server Vite).
// Estado é em memória por carregamento de página; cada teste é autossuficiente.

const TITLE_INPUT = 'digite o título da tarefa...';
const ADD_BUTTON = /adicionar tarefa/i;

async function addTask(page, title) {
  await page.getByPlaceholder(TITLE_INPUT).fill(title);
  await page.getByRole('button', { name: ADD_BUTTON }).click();
}

test.describe('Tarefas - criar, concluir e excluir', () => {
  test('adiciona uma nova tarefa à lista', async ({ page }) => {
    await page.goto('/');
    await addTask(page, 'Comprar leite');

    const item = page.locator('.task-list-item').filter({ hasText: 'Comprar leite' });
    await expect(item).toHaveCount(1);
    // Formulário é limpo após adicionar
    await expect(page.getByPlaceholder(TITLE_INPUT)).toHaveValue('');
  });

  test('não adiciona tarefa com título vazio', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: ADD_BUTTON }).click();
    await expect(page.locator('.task-list-item')).toHaveCount(0);
  });

  test('marca tarefa como concluída via checkbox', async ({ page }) => {
    await page.goto('/');
    await addTask(page, 'Estudar React');

    const item = page.locator('.task-list-item').filter({ hasText: 'Estudar React' });
    const checkbox = item.locator('.task-list-item-checkbox');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('remove tarefa e desfaz exclusão pela snackbar', async ({ page }) => {
    await page.goto('/');
    await addTask(page, 'Tarefa temporária');

    const item = page.locator('.task-list-item').filter({ hasText: 'Tarefa temporária' });
    // Último botão do item é o de remover (lixeira)
    await item.locator('.task-list-item-btn').last().click();

    // Snackbar aparece com botão Desfazer
    const snackbar = page.locator('.undo-snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toContainText('Tarefa "Tarefa temporária" removida');
    await expect(item).toHaveCount(0);

    // Desfaz a exclusão
    await snackbar.getByRole('button', { name: 'Desfazer' }).click();
    await expect(page.locator('.task-list-item').filter({ hasText: 'Tarefa temporária' })).toHaveCount(1);
  });
});