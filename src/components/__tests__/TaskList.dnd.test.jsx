import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../TaskList';

const tasks = [
{ id:'a', title:'Primeira', checked:false },
{ id:'b', title:'Segunda', checked:false },
{ id:'c', title:'Terceira', checked:false },
];

function setup(onReorder){
render(
<TaskList dataSource={tasks} onCheck={()=>{}} onRemove={()=>{}} onSubtaskToggle={()=>{}} onSubtaskAdd={()=>{}} onSubtaskRemove={()=>{}} onReorder={onReorder} />
);
}

function wrappers(){ return document.querySelectorAll('.task-list-item-wrapper'); }

describe('TaskList drag-and-drop',()=>{
it('renderiza wrappers draggable quando onReorder presente e sort none',()=>{
setup(vi.fn());
const items=wrappers();
expect(items.length).toBe(3);
items.forEach((el)=>expect(el.getAttribute('draggable')).toBe('true'));
});
it('dragOver adiciona classe drag-over ao alvo e drop chama onReorder com ids corretos',()=>{
const fn=vi.fn();
setup(fn);
const items=wrappers();
fireEvent.dragStart(items[0]);
fireEvent.dragOver(items[2]);
expect(items[2].className).toContain('drag-over');
fireEvent.drop(items[2]);
expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith('a','c');
});
it('drop no proprio item nao chama onReorder',()=>{
const fn=vi.fn();
setup(fn);
const items=wrappers();
fireEvent.dragStart(items[1]);
fireEvent.drop(items[1]);
expect(fn).not.toHaveBeenCalled();
});
it('sem prop onReorder os wrappers nao sao draggable degradacao graciosa',()=>{
setup(undefined);
wrappers().forEach((el)=>expect(el.getAttribute('draggable')).toBe('false'));
});
it('sortMode priority desabilita drag pois ordenacao automatica conflita com manual',()=>{
setup(vi.fn());
fireEvent.change(screen.getByLabelText('Ordenar tarefas por prioridade'),{ target:{ value:'priority' } });
wrappers().forEach((el)=>expect(el.getAttribute('draggable')).toBe('false'));
});
});