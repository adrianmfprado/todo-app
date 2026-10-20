import React from'react';
import{render,fireEvent,cleanup}from'@testing-library/react';
import{vi,expect,test}from'vitest';
import Snackbar,{UNDO_DURATION_MS}from'../SnackBar';

test('duracao padrao 5000ms',()=>{
expect(UNDO_DURATION_MS).toBe(5000);
});

test('sem mensagem nao renderiza',()=>{
render(<Snackbar message=""/>);
expect(document.querySelector('.undo-snackbar')).toBeNull();
cleanup();
});

test('renderiza mensagem e botao Desfazer',()=>{
render(<Snackbar message="Tarefa removida" actionLabel="Desfazer" onAction={()=>{}}/>);
expect(document.querySelector('.undo-snackbar-message').textContent).toContain('Tarefa removida');
expect(document.querySelector('.undo-snackbar-action').textContent).toBe('Desfazer');
cleanup();
});

test('clique em Desfazer chama onAction uma vez',()=>{
let c=0;
render(<Snackbar message="m" onAction={()=>{c++;}}/>);
fireEvent.click(document.querySelector('.undo-snackbar-action'));
expect(c).toBe(1);
cleanup();
});

test('expira apos durationMs chamando onExpire',()=>{
vi.useFakeTimers();
let exp=false;
render(<Snackbar message="m" durationMs={100} onExpire={()=>{exp=true;}}/>);
vi.advanceTimersByTime(100);
expect(exp).toBe(true);
vi.useRealTimers();
cleanup();
});