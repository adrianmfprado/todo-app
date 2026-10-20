import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../../pages/home';

function createTask(title) {
  const titleInput = screen.getByPlaceholderText(/digite o t.tulo da tarefa/i);
  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.click(screen.getByText(/adicionar tarefa/i));
}

describe('InlineEdit - integracao HomePage', () => {
  test('edicao de titulo persiste no estado raiz e sobrevive a re-render', () => {
    render(<HomePage />);
    createTask('Original');

    fireEvent.doubleClick(screen.getByText('Original'));
    const input = screen.getByDisplayValue('Original');
    fireEvent.change(input, { target: { value: 'Editada' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('Editada')).toBeInTheDocument();
    expect(screen.queryByText('Original')).toBeNull();
  });

  test('Esc cancela edicao mantendo titulo original', () => {
    render(<HomePage />);
    createTask('Fica');

    fireEvent.doubleClick(screen.getByText('Fica'));
    const input = screen.getByDisplayValue('Fica');
    fireEvent.change(input, { target: { value: 'Nao fica' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(screen.getByText('Fica')).toBeInTheDocument();
  });
});
