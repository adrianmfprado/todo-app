import { computeStats } from '../computeStats';
import { todayKey } from '../deadlineUtils';

const dayShift=(delta)=>{
 var d=new Date();
 var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+delta);
 var mm=String(x.getMonth()+1);
 if(mm.length<2){mm='0'+mm;}
 var dd=String(x.getDate());
 if(dd.length<2){dd='0'+dd;}
 return x.getFullYear()+'-'+mm+'-'+dd;
};

const zeros={total:0,pending:0,completed:0,overdue:0};

describe('computeStats',()=>{
 test('lista vazia retorna zeros',()=>{
  expect(computeStats([])).toEqual(zeros);
 });
 test('lista ausente ou nao array retorna zeros',()=>{
  expect(computeStats(undefined)).toEqual(zeros);
  expect(computeStats(null)).toEqual(zeros);
 });
 test('conta total pendentes e concluidas',()=>{
  var ts=[{id:'a',checked:false},{id:'b',checked:true},{id:'c',checked:false}];
  expect(computeStats(ts)).toEqual({total:3,pending:2,completed:1,overdue:0});
 });
 test('atrasadas apenas pendentes com prazo vencido',()=>{
  var ts=[{id:'a',checked:false,dueDate:dayShift(-1)},{id:'b',checked:false,dueDate:todayKey()},{id:'c',checked:false,dueDate:dayShift(1)}];
  expect(computeStats(ts).overdue).toBe(1);
 });
 test('concluida com prazo vencido nao e atrasada',()=>{
  var s=computeStats([{id:'a',checked:true,dueDate:'2000-01-01'}]);
  expect(s.overdue).toBe(0);
  expect(s.completed).toBe(1);
 });
 test('sem dueDate nunca e atrasada',()=>{
  var s=computeStats([{id:'a',checked:false,dueDate:''},{id:'b',checked:false}]);
  expect(s.overdue).toBe(0);
  expect(s.pending).toBe(2);
 });
 test('itens nulos ou invalidos sao ignorados individualmente',()=>{
  var s=computeStats([null,{id:'a',checked:true},'x',{id:'b',checked:false},42]);
  expect(s.total).toBe(2);
  expect(s.completed).toBe(1);
  expect(s.pending).toBe(1);
 });
});
