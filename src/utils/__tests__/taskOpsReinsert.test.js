import{test,expect}from'vitest';
import{removeAt,reinsert}from'../taskOps';

const L=[{id:1,title:'A'},{id:2,title:'B'},{id:3,title:'C'}];

test('reinsert restaura posicao original',()=>{
expect(reinsert(removeAt(L,0),L[0],0).map(t=>t.title)).toEqual(['A','B','C']);
});

test('reinsert no fim',()=>{
expect(reinsert(removeAt(L,2),L[2],2).map(t=>t.title)).toEqual(['A','B','C']);
});

test('reinsert preserva objeto por referencia',()=>{
const r=removeAt(L,1);
const out=reinsert(r,L[1],1);
expect(out[1]).toBe(L[1]);
});