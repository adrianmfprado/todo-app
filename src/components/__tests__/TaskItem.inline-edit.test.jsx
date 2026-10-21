import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../TaskItem';

function setup() {
  const item = { id: 7, title: 'Comprar leite', description: 'Duas caixas', checked: false };
  const props = { onCheck: jest.fn(), onRemove: jest.fn(), onUpdate: jest.fn() };
  render(<TaskItem item={item} {...props} />);
  return props;
}

describe('TaskItem - edicao inline', () => {
  test('duplo clique no titulo abre input com valor atual', () => {
    setup();
    fireEvent.doubleClick(screen.getByText('Comprar leite'));
    const input = screen.getByDisplayValue('Comprar leite');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Editar titulo da tarefa');
  });

  test('Enter salva novo titulo e chama onUpdate', () => {
    const props = setup();
    fireEvent.doubleClick(screen.getByText('Comprar leite'));
    const input = screen.getByDisplayValue('Comprar leite');
    fireEvent.change(input, { target: { value: 'Leite integral' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(props.onUpdate).toHaveBeenCalledWith(7, { title: 'Leite integral' });
  });

  test('blur salva titulo editado', () => {
    const props = setup();
    fireEvent.doubleClick(screen.getByText('Comprar leite'));
    const input = screen.getByDisplayValue('Comprar leite');
    fireEvent.change(input, { target: { value: 'Titulo blur' } });
    fireEvent.blur(input);
    expect(props.onUpdate).toHaveBeenCalledWith(7, { title: 'Titulo blur' });
  });

  test('Esc cancela e restaura titulo anterior sem chamar onUpdate', () => {
    const props = setup();
    fireEvent.doubleClick(screen.getByText('Comprar leite'));
    const input = screen.getByDisplayValue('Comprar leite');
    fireEvent.change(input, { target: { value: 'Rascunho' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(props.onUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Comprar leite')).toBeInTheDocument();
  });

  test('titulo vazio e rejeitado mantendo anterior', () => {
    const props = setup();
    fireEvent.doubleClick(screen.getByText('Comprar leite'));
    const input = screen.getByDisplayValue('Comprar leite');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(props.onUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Comprar leite')).toBeInTheDocument();
  });

  test('guard sem onUpdate nao crasha e sai do modo edicao', () => {
    render(<TaskItem item={{ id: 1, title: 'T1' }} onCheck={jest.fn()} onRemove={jest.fn()} />);
    fireEvent.doubleClick(screen.getByText('T1'));
    const input2 = screen.getByDisplayValue('T1');
    fireEvent.keyDown(input2, { key: 'Enter' });
    expect(screen.queryByDisplayValue('T1')).toBeNull();
  });
});
