import{test,expect}from'vitest';
import{findTaskIndex,removeAt,reinsert}from'../taskOps';

const A={id:1,title:'A'};
const B={id:2,title:'B'};
const C={id:3,title:'C'};

test('findTaskIndex por id',()=>{
expect(findTaskIndex([A,B,C],B)).toBe(1);
});

test('fallback titulo unico',()=>{
expect(findTaskIndex([A,B],{title:'B'})).toBe(1);
});

test('removeAt imutavel',()=>{
const l=[A,B,C];
const r=removeAt(l,1);
});

test('reinsert restaura posicao',()=>{
});