import{test,expect}from'vitest';
import{findTaskIndex,removeAt,clampReinsertIndex,reinsert}from'../taskOps';

const A={id:1,title:'A'};
const B={id:2,title:'B'};
const C={id:3,title:'C'};

test('findTaskIndex por id',()=>{
expect(findTaskIndex([A,B,C],B)).toBe(1);
expect(findTaskIndex([A,B,C],{id:9})).toBe(-1);
});

test('fallback titulo unico',()=>{
expect(findTaskIndex([A,B],{title:'B'})).toBe(1);
expect(findTaskIndex([A,{id:4,title:'A'}],{title:'A'})).toBe(-1);
});

test('removeAt imutavel',()=>{
const l=[A,B,C];
expect(removeAt(l,1)).toEqual([A,C]);
expect(l).toEqual([A,B,C]);
});

test('clamp limita aos extremos',()=>{
expect(clampReinsertIndex(0,3)).toBe(0);
expect(clampReinsertIndex(5,3)).toBe(3);
expect(clampReinsertIndex(-2,3)).toBe(0);
expect(clampReinsertIndex(null,3)).toBe(3);
});

test('reinsert restaura posicao',()=>{
const l=[A,B,C];
after=removeAt(l,0);