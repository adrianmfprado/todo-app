import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import HomePage from '../../pages/home';

let dateSpy;
let seq;

beforeEach(function(){
seq=0;
dateSpy=vi.spyOn(Date,'now').mockImplementation(function(){ seq+=1; return 1700000000000+seq; });
});

afterEach(function(){
cleanup();
if(dateSpy){ dateSpy.mockRestore(); }
});

function addTask(title){
fireEvent.change(screen.getByPlaceholderText(/digite o t.tulo da tarefa/),{ target:{ value:title } });
fireEvent.click(screen.getByText(/adicionar tarefa/i));
}

function wrappers(){ return document.querySelectorAll('.task-list-item-wrapper'); }

function dragAndDrop(fromEl,toEl){
fireEvent.dragStart(fromEl);
fireEvent.dragOver(toEl);
fireEvent.drop(toEl);
}

function titles(){ return Array.from(wrappers()).map(function(el){ return el.textContent; }); }

function findWrapperByTitle(title){
return Array.from(wrappers()).find(function(el){ return el.textContent.indexOf(title)!==-1; });
}

describe('Drag reorder integration',function(){
it('reordena tarefas via drag-and-drop e reflete na renderizacao apos o drop',function(){
render(<HomePage />);
['Comprar leite','Reunião de trabalho','Estudar React'].forEach(addTask);
expect(titles().length).toBe(3);
dragAndDrop(findWrapperByTitle('Comprar leite'),findWrapperByTitle('Estudar React'));
expect(titles()[0]).toContain('Reunião de trabalho');
expect(titles()[1]).toContain('Estudar React');
expect(titles()[2]).toContain('Comprar leite');
dragAndDrop(findWrapperByTitle('Reunião de trabalho'),findWrapperByTitle('Comprar leite'));
expect(titles()[0]).toContain('Estudar React');
});
it('drop no proprio item mantem ordem inalterada',function(){
render(<HomePage />);
['A','B','C'].forEach(addTask);
dragAndDrop(findWrapperByTitle('A'),findWrapperByTitle('A'));
expect(titles()[0]).toContain('A');
expect(titles()[1]).toContain('B');
expect(titles()[2]).toContain('C');
});
});
