import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HomePage from '../../pages/home';
const add=t=>{fireEvent.change(screen.getByPlaceholderText('digite o título da tarefa...'),{target:{value:t}});fireEvent.click(screen.getByText(/adicionar tarefa/));};
const go=q=>{fireEvent.change(screen.getByLabelText('Buscar tarefas:'),{target:{value:q}});act(()=>jest.advanceTimersByTime(400));};
describe('Full-Text Search Integration',()=>{
beforeEach(()=>{jest.useFakeTimers();render(<HomePage/>);['Comprar leite','Reunião de trabalho','Estudar React','Lavar roupa'].forEach(add);});
afterEach(()=>{act(()=>jest.runOnlyPendingTimers());jest.useRealTimers();});
test('FR03 busca case-insensitive filtra lista',()=>{
const count=()=>document.querySelectorAll('.task-list-item').length;
go('LEITE');
expect(count()).toBe(1);
go('xyznaoexiste');
expect(count()).toBe(0);
expect(screen.getByText(/Nenhuma tarefa encontrada para/i)).toBeInTheDocument();
});
test('FR04 destaca trechos casados',()=>{
go('leite');
expect(document.querySelectorAll('.search-highlight').length+document.querySelectorAll('mark').length).toBeGreaterThan(0);
});
test('FR05 botao limpar restaura lista respeitando view e categoria',()=>{
go('leite');
fireEvent.click(screen.getByRole('button',{name:/limpar/i}));
act(()=>jest.advanceTimersByTime(400));
expect(screen.queryByText(/Reunião de trabalho/)).toBeInTheDocument();
});
});