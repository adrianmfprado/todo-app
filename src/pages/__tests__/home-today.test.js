import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../home';

function todayString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd;
}

function addTask(title, dueDate) {
  const input = screen.getByPlaceholderText('digite o título da tarefa...');
  fireEvent.change(input, { target: { value: title } });
  if (dueDate) {
    const toggle = screen.getByRole('button', { name: 'mais opções' });
    if (toggle.getAttribute('aria-expanded') === 'false') {
      fireEvent.click(toggle);
    }
    const dateInput = document.querySelector('input[type="date"]');
    fireEvent.change(dateInput, { target: { value: dueDate } });
  }
  const addButton = screen.getByRole('button', { name: /adicionar tarefa/i });
  fireEvent.click(addButton);
}

describe('HomePage - Today smart view', () => {
  test('renderiza as abas de filtro Todas e Hoje', () => {
    render(<HomePage />);
    expect(screen.getByRole('tab', { name: 'Todas' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Hoje' })).toBeInTheDocument();
  });

  test('aba Todas vem selecionada por padrao', () => {
    render(<HomePage />);
    expect(screen.getByRole('tab', { name: 'Todas' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Hoje' })).toHaveAttribute('aria-selected', 'false');
  });

  test('exibe apenas tarefas com vencimento hoje na aba Hoje', () => {
    render(<HomePage />);
    addTask('Tarefa de hoje', todayString());
    addTask('Tarefa futura', '2099-12-31');
    fireEvent.click(screen.getByRole('tab', { name: 'Hoje' }));
    expect(screen.getByText('Tarefa de hoje')).toBeInTheDocument();
    expect(screen.queryByText('Tarefa futura')).not.toBeInTheDocument();
  });

  test('exclui tarefas atrasadas da aba Hoje', () => {
    render(<HomePage />);
    addTask('Tarefa atrasada', '2020-01-01');
    fireEvent.click(screen.getByRole('tab', { name: 'Hoje' }));
    expect(screen.queryByText('Tarefa atrasada')).not.toBeInTheDocument();
  });

  test('exclui tarefas sem data de vencimento da aba Hoje', () => {
    render(<HomePage />);
    addTask('Tarefa sem data');
    fireEvent.click(screen.getByRole('tab', { name: 'Hoje' }));
    expect(screen.queryByText('Tarefa sem data')).not.toBeInTheDocument();
  });

  test('mostra mensagem especifica quando nenhuma tarefa vence hoje', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Hoje' }));
    expect(screen.getByText('Nenhuma tarefa vence hoje!')).toBeInTheDocument();
  });

  test('voltar para Todas exibe todas as tarefas novamente', () => {
    render(<HomePage />);
    addTask('Tarefa de hoje', todayString());
    addTask('Tarefa futura', '2099-12-31');
    fireEvent.click(screen.getByRole('tab', { name: 'Hoje' }));
    fireEvent.click(screen.getByRole('tab', { name: 'Todas' }));
    expect(screen.getByText('Tarefa de hoje')).toBeInTheDocument();
    expect(screen.getByText('Tarefa futura')).toBeInTheDocument();
  });

  test('tarefa adicionada com vencimento hoje aparece na aba Hoje', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Hoje' }));
    addTask('Nova tarefa de hoje', todayString());
    expect(screen.getByText('Nova tarefa de hoje')).toBeInTheDocument();
  });
});
