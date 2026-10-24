import { test, expect } from '@playwright/test';

// Fluxo de filtro por tags via chips do TaskList (data-testid chip-tag-<tag>).

const TITLE_INPUT = 'digite o título da tarefa...';
const ADD_BUTTON = /adicionar tarefa/i;
const TAGS_INPUT = 'Adicionar tags (separadas por vírgula)';

async function addTaskWithTags(page, title, tags) {
  await page.getByPlaceholder(TITLE_INPUT).fill(title);
  await page.getByPlaceholder(TAGS_INPUT).fill(tags);
  await page.getByRole('button', { name: ADD_BUTTON }).click();
}

test.describe('Filtro por tags', () => {
  test('exibe chips de tags e filtra a lista ao clicar', async ({ page }) => {
    await page.goto('/');
    await addTaskWithTags(page, 'Tarefa casa', 'casa');
    await addTaskWithTags(page, 'Tarefa trabalho', 'trabalho');
    await addTaskWithTags(page, 'Tarefa mista', 'casa, trabalho');

    // Chips aparecem com contagem
    const chipCasa = page.getByTestId('chip-tag-casa');
    const chipTrabalho = page.getByTestId('chip-tag-trabalho');
    await expect(chipCasa).toContainText('#casa (2)');
    await expect(chipTrabalho).toContainText('#trabalho (2)');

    // Filtra por casa: 2 tarefas
    await chipCasa.click();
    await expect(chipCasa).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.task-list-item')).toHaveCount(2);
    await expect(page.locator('.task-list-item-title').filter({ hasText: 'Tarefa trabalho' })).toHaveCount(0);

    // Combina com trabalho (semântica OR do app): todas as 3 tarefas têm casa OU trabalho
    await chipTrabalho.click();
    await expect(chipTrabalho).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.task-list-item')).toHaveCount(3);

    // Desmarca tudo: volta a mostrar todas
    await chipCasa.click();
    await chipTrabalho.click();
    await expect(chipCasa).toHaveAttribute('aria-pressed', 'false');
    await expect(chipTrabalho).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('.task-list-item')).toHaveCount(3);
  });
});