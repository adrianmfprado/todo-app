import { test, expect } from '@playwright/test';

// Fluxos de busca full-text e edição inline via UI real.

const TITLE_INPUT = 'digite o título da tarefa...';
const ADD_BUTTON = /adicionar tarefa/i;

async function addTask(page, title) {
  await page.getByPlaceholder(TITLE_INPUT).fill(title);
  await page.getByRole('button', { name: ADD_BUTTON }).click();
}

test.describe('Busca full-text', () => {
  test('filtra tarefas por termo (mínimo 3 caracteres)', async ({ page }) => {
    await page.goto('/');
    await addTask(page, 'Comprar pão na padaria');
    await addTask(page, 'Ler livro novo');

    const search = page.getByRole('combobox', { name: 'Buscar tarefas' });
    // Menos de 3 caracteres: não filtra
    await search.fill('pão');
    await expect(page.locator('.task-list-item')).toHaveCount(2);

    // A partir de 3 caracteres (com debounce ~300ms): filtra
    await search.fill('pão n');
    await expect(page.locator('.task-list-item')).toHaveCount(1);
    await expect(page.locator('.task-list-item-title')).toContainText('pão');

    // Mensagem de vazio quando nada corresponde
    await search.fill('zzzzz');
    await expect(page.locator('.task-list-message')).toContainText('Nenhuma tarefa encontrada');

    // Limpar busca restaura a lista
    await page.getByRole('button', { name: 'Limpar busca' }).click();
    await expect(page.locator('.task-list-item')).toHaveCount(2);
  });
});

test.describe('Edição inline', () => {
  test('edita o título da tarefa com duplo clique + Enter', async ({ page }) => {
    await page.goto('/');
    await addTask(page, 'Título original');

    const titleDiv = page.locator('.task-list-item-title').filter({ hasText: 'Título original' });
    await titleDiv.dblclick();

    const inlineInput = page.getByLabel('Editar titulo da tarefa');
    await expect(inlineInput).toBeVisible();
    await inlineInput.fill('Título editado');
    await inlineInput.press('Enter');

    await expect(page.locator('.task-list-item-title').filter({ hasText: 'Título editado' })).toHaveCount(1);
  });

  test('Escape cancela a edição do título', async ({ page }) => {
    await page.goto('/');
    await addTask(page, 'Não muda');

    const titleDiv = page.locator('.task-list-item-title').filter({ hasText: 'Não muda' });
    await titleDiv.dblclick();

    const inlineInput = page.getByLabel('Editar titulo da tarefa');
    await inlineInput.fill('rascunho que não deve valer');
    await inlineInput.press('Escape');

    // Input some e o título permanece o original
    await expect(inlineInput).toHaveCount(0);
    await expect(page.locator('.task-list-item-title').filter({ hasText: 'Não muda' })).toHaveCount(1); })r;r