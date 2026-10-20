// Operações puras para remoção com desfazer.
// Identidade por id quando disponível; fallback por título apenas se único.

export function findTaskIndex(list,item){
if(!item)return -1;
if(item.id!=null){
const i=list.findIndex((t)=>t.id===item.id);
if(i>=0)return i;
}
if(item.title!=null){
const same=list.filter((t)=>t.title===item.title);
if(same.length===1)return list.indexOf(same[0]);
}
return -1;
}

export function removeAt(list,index){
return list.filter((_,i)=>i!==index);
}

export function clampReinsertIndex(index,length){
const n=(typeof index==='number'&&Number.isFinite(index))?index:length;
return Math.max(0,Math.min(n,length));
}

export function reinsert(list,task,index){
const i=clampReinsertIndex(index,list.length);
return [...list.slice(0,i),task,...list.slice(i)];
}