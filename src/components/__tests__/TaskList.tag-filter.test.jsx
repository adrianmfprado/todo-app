import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../TaskList';

const tasks = [
  { id:'a', title:'Primeira', checked:false, tags:['casa','urgente'] },
  { id:'b', title:'Segunda', checked:false, tags:['trabalho'] },
  { id:'c', title:'Terceira', checked:false, tags:['casa'] }
];

function setup(){
  render(<TaskList dataSource={tasks} onCheck={()=>{}} onRemove={()=>{}} onSubtaskToggle={()=>{}} onSubtaskAdd={()=>{}} onSubtaskRemove={()=>{}} />);
}

function titles(){
  return Array.from(document.querySelectorAll('.task-list-item-title')).map(el=>el.textContent);
}

describe('TaskList filtro por tags',()=>{
  it('renderiza chips com contagem correta',()=>{
    setup();
    expect(screen.getByTestId('chip-tag-casa')).toHaveTextContent('#casa (2)');
    expect(screen.getByTestId('chip-tag-urgente')).toHaveTextContent('#urgente (1)');
    expect(screen.getByTestId('chip-tag-trabalho')).toHaveTextContent('#trabalho (1)');
  });
  it('clicar em chip filtra tarefas exibidas OR',()=>{
    setup();
    fireEvent.click(screen.getByTestId('chip-tag-casa'));
    const t=titles();
    expect(t).toContain('Primeira');
    expect(t).toContain('Terceira');
    expect(t).not.toContain('Segunda');
  });
  it('clicar no mesmo chip remove filtro e restaura todas',()=>{
    setup();
    fireEvent.click(screen.getByTestId('chip-tag-casa'));
    fireEvent.click(screen.getByTestId('chip-tag-casa'));
    const t=titles();
    expect(t).toContain('Primeira');
    expect(t).toContain('Segunda');
    expect(t).toContain('Terceira');
  });
  it('chips ativos recebem classe active e aria-pressed true',()=>{
    setup();
    const chip=screen.getByTestId('chip-tag-casa');
    fireEvent.click(chip);
    expect(chip.className).toContain('active');
    expect(chip.getAttribute('aria-pressed')).toBe('true');
  });
});
