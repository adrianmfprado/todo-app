import{describe,test,expect}from'vitest';
import useHomeHandlers from '../useHomeHandlers';

// Espelha o comportamento real do React: handlers recriados a cada render
// enxergando sempre o estado corrente.
function setup(tasks){
let state=tasks;
const setTasks=(next)=>{state=next;};
const run=function(){return useHomeHandlers(state,setTasks);};
return{run:run,state:function(){return state;}};
}

describe('useHomeHandlers - add de subtarefas',()=>{
test('gera ids unicos para duas subtarefas com mesmo texto adicionadas em sequencia',()=>{
const t={id:'t1',title:'Tarefa',checked:false};
const s=setup([t]);
s.run().add('t1','comprar leite');
s.run().add('t1','comprar leite');
const subs=s.state()[0].subtasks;
expect(subs.length).toBe(2);
expect(subs[0].id).not.toBe(subs[1].id);
});

test('cria subtarefa com modelo {id,text,done:false} e id textual estavel',()=>{
const t={id:'t2',title:'Tarefa',checked:false};
const s=setup([t]);
s.run().add('t2','nova');
const sub=s.state()[0].subtasks[0];
expect(typeof sub.id).toBe('string');
expect(sub.text).toBe('nova');
expect(sub.done).toBe(false);
});

test('adiciona em tarefa sem subtasks preexistentes',()=>{
const t={id:'t3',title:'Tarefa',checked:false};
const s=setup([t]);
s.run().add('t3','primeira');
expect(s.state()[0].subtasks.length).toBe(1);
});
});