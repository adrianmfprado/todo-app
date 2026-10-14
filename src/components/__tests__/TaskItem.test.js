import { render, screen } from '@testing-library/react';
import TaskItem from '../TaskItem';

function renderTask(item) {
  const onCheck = jest.fn();
  const onRemove = jest.fn();
  render(<TaskItem item={item} onCheck={onCheck} onRemove={onRemove} />);
  return { onCheck, onRemove };
}

describe('TaskItem - overdue badge', () => {
  test('exibe o badge "Atrasada" para tarefa incompleta com data passada', () => {
    renderTask({ id: 1, title: 'Tarefa vencida', checked: false, dueDate: '2020-01-01' });
    expect(screen.getByText('Atrasada')).toBeInTheDocument();
  });

  test('aplica a classe "overdue" no item atrasado', () => {
    renderTask({ id: 1, title: 'Tarefa vencida', checked: false, dueDate: '2020-01-01' });
    const badge = screen.getByText('Atrasada');
    expect(badge).toHaveClass('overdue-badge');
    expect(badge.closest('.task-list-item')).toHaveClass('overdue');
  });

  test('nao exibe o badge para tarefa concluida mesmo com data passada', () => {
    renderTask({ id: 1, title: 'Tarefa concluida', checked: true, dueDate: '2020-01-01' });
    expect(screen.queryByText('Atrasada')).not.toBeInTheDocument();
  });

  test('nao exibe o badge para tarefa com data futura', () => {
    renderTask({ id: 1, title: 'Tarefa futura', checked: false, dueDate: '2099-12-31' });
    expect(screen.queryByText('Atrasada')).not.toBeInTheDocument();
  });

  test('nao exibe o badge para tarefa sem data de vencimento', () => {
    renderTask({ id: 1, title: 'Tarefa sem data', checked: false });
    expect(screen.queryByText('Atrasada')).not.toBeInTheDocument();
  });

  test('nao aplica a classe "overdue" em tarefa sem data', () => {
    renderTask({ id: 1, title: 'Tarefa sem data', checked: false });
    const item = screen.getByText('Tarefa sem data').closest('.task-list-item');
    expect(item).not.toHaveClass('overdue');
  });

  test('exibe a data de vencimento quando presente', () => {
    renderTask({ id: 1, title: 'Tarefa futura', checked: false, dueDate: '2099-12-31' });
    expect(screen.getByText('2099-12-31')).toBeInTheDocument();
  });

  test('nao renderiza bloco de data quando dueDate esta ausente', () => {
    renderTask({ id: 1, title: 'Tarefa sem data', checked: false });
    expect(document.querySelector('.task-list-item-due')).not.toBeInTheDocument();
  });
});
