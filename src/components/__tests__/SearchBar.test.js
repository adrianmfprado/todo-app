import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';

describe('SearchBar full-text search', () => {
let onFilterChange;
let onTextSearch;

beforeEach(() => {
jest.useFakeTimers();
onFilterChange = jest.fn();
onTextSearch = jest.fn();
});

afterEach(() => {
jest.runOnlyPendingTimers();
jest.useRealTimers();
});

test('renderiza input combobox com aria-label e placeholder', () => {
render(<SearchBar onFilterChange={onFilterChange} onTextSearch={onTextSearch} />);
const input = screen.getByRole('combobox', { name: 'Buscar tarefas' });
expect(input).toHaveAttribute('aria-label', 'Buscar tarefas');
expect(input).toHaveAttribute('placeholder', 'Digite pelo menos três caracteres');
});

test('nao dispara busca com menos de tres caracteres', () => {
render(<SearchBar onFilterChange={onFilterChange} onTextSearch={onTextSearch} />);
const input = screen.getByRole('combobox', { name: 'Buscar tarefas' });
fireEvent.change(input, { target: { value: 'ab' } });
jest.advanceTimersByTime(300);
expect(onTextSearch).not.toHaveBeenCalled();
});

test('debounce dispara apos exatamente 300ms com termo valido', () => {
render(<SearchBar onFilterChange={onFilterChange} onTextSearch={onTextSearch} />);
const input = screen.getByRole('combobox', { name: 'Buscar tarefas' });
fireEvent.change(input, { target: { value: 'comprar' } });
jest.advanceTimersByTime(299);
expect(onTextSearch).not.toHaveBeenCalled();
jest.advanceTimersByTime(1);
expect(onTextSearch).toHaveBeenCalledTimes(1);
expect(onTextSearch).toHaveBeenCalledWith('comprar');
});

test('query vazia limpa imediatamente sem debounce', () => {
render(<SearchBar onFilterChange={onFilterChange} onTextSearch={onTextSearch} />);
const input = screen.getByRole('combobox', { name: 'Buscar tarefas' });
fireEvent.change(input, { target: { value: 'comprar' } });
jest.advanceTimersByTime(300);
expect(onTextSearch).toHaveBeenCalledWith('comprar');
fireEvent.change(input, { target: { value: '' } });
expect(onTextSearch).toHaveBeenLastCalledWith('');
});
test('botao X visivel apenas com query nao vazia e limpa busca', () => {
render(<SearchBar onFilterChange={onFilterChange} onTextSearch={onTextSearch} />);
const input = screen.getByRole('combobox', { name: 'Buscar tarefas' });
expect(screen.queryByRole('button', { name: 'Limpar busca' })).toBeNull();
fireEvent.change(input, { target: { value: 'comprar' } });
const clearBtn = screen.getByRole('button', { name: 'Limpar busca' });
fireEvent.click(clearBtn);
expect(input.value).toBe('');
expect(onTextSearch).toHaveBeenLastCalledWith('');
});
test('Enter dispara busca imediata e Escape limpa', () => {
render(<SearchBar onFilterChange={onFilterChange} onTextSearch={onTextSearch} />);
const input = screen.getByRole('combobox', { name: 'Buscar tarefas' });
fireEvent.change(input, { target: { value: 'comprar' } });
fireEvent.keyDown(input, { key: 'Enter' });
expect(onTextSearch).toHaveBeenCalledWith('comprar');
fireEvent.keyDown(input, { key: 'Escape' });
expect(input.value).toBe('');
expect(onTextSearch).toHaveBeenLastCalledWith('');
});
test('select de status continua emitindo onFilterChange', () => {
render(<SearchBar onFilterChange={onFilterChange} onTextSearch={onTextSearch} />);
fireEvent.change(screen.getByLabelText('Filtrar por status:'), { target: { value: 'completed' } });
expect(onFilterChange).toHaveBeenCalledWith('completed');
});
});