import{test,expect}from'vitest';
import{findTaskIndex,removeAt,clampReinsertIndex}from'../taskOps';

const L=[{id:1,title:'A'},{id:2,title:'B'},{id:3,title:'C'}];

test('findTaskIndex por id',()=>{
expect(findTaskIndex(L,L[1])).toBe(1);
expect(findTaskIndex(L,{id:9})).toBe(-1);
});

test('fallback titulo unico',()=>{
expect(findTaskIndex(L,{title:'B'})).toBe(1);
});

test('removeAt imutavel',()=>{
const r=removeAt(L,1);
expect(r.map(t=>t.title)).toEqual(['A','C']);
expect(L.length).toBe(3);
});

test('clamp extremos',()=>{
expect(clampReinsertIndex(0,3)).toBe(0);
expect(clampReinsertIndex(5,3)).toBe(3);
expect(clampReinsertIndex(-2,3)).toBe(0);
expect(clampReinsertIndex(null,3)).toBe(3);
});