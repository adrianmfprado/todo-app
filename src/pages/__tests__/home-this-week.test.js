import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../home';

function toLocalDateString(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd;
}

function todayString() {
  return toLocalDateString(new Date());
}

function dateInDaysString(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toLocalDateString(date);
}

function addTask(title, dueDate) {
  const input = screen.getByPlaceholderText('digite o título da tarefa...');
  fireEvent.change(input, { target: { value: title } });
  if (dueDate) {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
      fireEvent.change(dateInput, { target: { value: dueDate } });
    }
  }
  const addButton = screen.getByRole('button', { name: /adicionar tarefa/i });
  fireEvent.click(addButton);
}

describe('HomePage - This Week smart view', () => {
  test('renderiza a aba de filtro Esta semana', () => {
    render(<HomePage />);
    expect(screen.getByRole('tab', { name: 'Esta semana' })).toBeInTheDocument();
  });

  test('aba Esta semana nao vem selecionada por padrao', () => {
    render(<HomePage />);
    expect(screen.getByRole('tab', { name: 'Esta semana' })).toHaveAttribute('aria-selected', 'false');
  });

  test('exibe tarefas com vencimento hoje na aba Esta semana', () => {
    render(<HomePage />);
    addTask('Tarefa de hoje', todayString());
    fireEvent.click(screen.getByRole('tab', { name: 'Esta semana' }));
    expect(screen.getByText('Tarefa de hoje')).toBeInTheDocument();
  });

  test('exibe tarefas com vencimento em ate 7 dias na aba Esta semana', () => {
    render(<HomePage />);
    addTask('Tarefa em 3 dias', dateInDaysString(3));
    addTask('Tarefa em 7 dias', dateInDaysString(7));
    fireEvent.click(screen.getByRole('tab', { name: 'Esta semana' }));
    expect(screen.getByText('Tarefa em 3 dias')).toBeInTheDocument();
    expect(screen.getByText('Tarefa em 7 dias')).toBeInTheDocument();
  });

  test('exclui tarefas com vencimento alem de 7 dias da aba Esta semana', () => {
    render(<HomePage />);
    addTask('Tarefa em 8 dias', dateInDaysString(8));
    addTask('Tarefa distante', '2099-12-31');
    fireEvent.click(screen.getByRole('tab', { name: 'Esta semana' }));
    expect(screen.queryByText('Tarefa em 8 dias')).not.toBeInTheDocument();
    expect(screen.queryByText('Tarefa distante')).not.toBeInTheDocument();
  });

  test('exclui tarefas atrasadas da aba Esta semana', () => {
    render(<HomePage />);
    addTask('Tarefa atrasada', '2020-01-01');
    fireEvent.click(screen.getByRole('tab', { name: 'Esta semana' }));
    expect(screen.queryByText('Tarefa atrasada')).not.toBeInTheDocument();
  });

  test('exclui tarefas sem data de vencimento da aba Esta semana', () => {
    render(<HomePage />);
    addTask('Tarefa sem data');
    fireEvent.click(screen.getByRole('tab', { name: 'Esta semana' }));
    expect(screen.queryByText('Tarefa sem data')).not.toBeInTheDocument();
  });

  test('mostra mensagem especifica quando nenhuma tarefa vence nos proximos 7 dias', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Esta semana' }));
    expect(screen.getByText('Nenhuma tarefa vence nos próximos 7 dias!')).toBeInTheDocument();
  });

  test('voltar para Todas exibe todas as tarefas novamente', () => {
    render(<HomePage />);
    addTask('Tarefa de hoje', todayString());
    addTask('Tarefa distante', '2099-12-31');
    fireEvent.click(screen.getByRole('tab', { name: 'Esta semana' }));
    fireEvent.click(screen.getByRole('tab', { name: 'Todas' }));
    expect(screen.getByText('Tarefa de hoje')).toBeInTheDocument();
    expect(screen.getByText('Tarefa distante')).toBeInTheDocument();
  });
});
