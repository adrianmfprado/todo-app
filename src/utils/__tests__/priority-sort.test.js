import { sortByPriority } from '../priority';

const mk=(...ps)=>ps.map((p,i)=>({id:String(i),title:'t'+i,priority:p}));

test('ordena alta antes de media antes de baixa',()=>{
 const o=sortByPriority(mk('baixa','alta','media'));
 expect(o.map(t=>t.priority)).toEqual(['alta','media','baixa']);
});

test('sem prioridade valida vai ao final e entrada nao e mutada',()=>{
 const orig=mk(undefined,'baixa','alta');
 const o=sortByPriority(orig);
 expect(o.map(t=>t.priority)).toEqual(['alta','baixa',undefined]);
 expect(orig.map(t=>t.priority)).toEqual([undefined,'baixa','alta']);
});

test('empates preservam ordem original (estavel)',()=>{
 const ts=[{id:'a',priority:'media'},{id:'b',priority:'alta'},{id:'c',priority:'media'}];
 const o=sortByPriority(ts);
 expect(o.map(t=>t.id)).toEqual(['b','a','c']);
});