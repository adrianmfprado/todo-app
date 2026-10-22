import { DEADLINE_STATUS,toDayKey,todayKey,normalizeDayKey,getDeadlineStatus,sortByDeadline } from '../deadlineUtils';

const mk=(id,dueDate)=>({id:id,dueDate:dueDate});

const dayShift=(delta)=>{
 var d=new Date();
 var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+delta);
 var mm=String(x.getMonth()+1);
 if(mm.length<2){mm='0'+mm;}
 var dd=String(x.getDate());
 if(dd.length<2){dd='0'+dd;}
 return x.getFullYear()+'-'+mm+'-'+dd;
};

describe('toDayKey',()=>{
 test('formata componentes locais como AAAA-MM-DD',()=>{
  expect(toDayKey(new Date(2026,9,22))).toBe('2026-10-22');
 });
 test('preenche zero em mes e dia de um digito',()=>{
  expect(toDayKey(new Date(2026,0,5))).toBe('2026-01-05');
 });
 test('retorna vazio para Date invalida ou nao Date',()=>{
  expect(toDayKey(new Date(NaN))).toBe('');
  expect(toDayKey(null)).toBe('');
  expect(toDayKey(undefined)).toBe('');
  expect(toDayKey('2026-10-22')).toBe('');
 });
});

describe('todayKey',()=>{
 test('retorna chave canonica do dia atual',()=>{
  var k=todayKey();
  expect(k.length).toBe(10);
  expect(k.charAt(4)).toBe('-');
  expect(k.charAt(7)).toBe('-');
 });
 test('coincide com toDayKey da data atual',()=>{
  expect(todayKey()).toBe(toDayKey(new Date()));
 });
});

describe('normalizeDayKey',()=>{
 test('mantem valor ja canonico AAAA-MM-DD',()=>{
  expect(normalizeDayKey('2026-10-22')).toBe('2026-10-22');
 });
 test('extrai parte da data de ISO completo com T',()=>{
  expect(normalizeDayKey('2026-10-22T14:59:11')).toBe('2026-10-22');
 });
 test('aplica trim nas bordas',()=>{
  expect(normalizeDayKey('  2026-10-22  ')).toBe('2026-10-22');
 });
 test('retorna vazio para formatos invalidos e nao strings',()=>{
  expect(normalizeDayKey('22/10/2026')).toBe('');
 });
});

describe('getDeadlineStatus',()=>{
 test('retorna null para tarefa concluida',()=>{
  expect(getDeadlineStatus('2000-01-01',true)).toBe(null);
 });
 test('retorna null quando sem prazo valido',()=>{
  expect(getDeadlineStatus('',false)).toBe(null);
  expect(getDeadlineStatus(undefined,false)).toBe(null);
  expect(getDeadlineStatus('22/10/2026',false)).toBe(null);
 });
 test('classifica prazo anterior a hoje como overdue',()=>{
  expect(getDeadlineStatus(dayShift(-1),false)).toBe(DEADLINE_STATUS.OVERDUE);
 });
 test('classifica hoje como today',()=>{
  expect(getDeadlineStatus(todayKey(),false)).toBe(DEADLINE_STATUS.TODAY);
 });
 test('classifica prazo futuro como future',()=>{
  expect(getDeadlineStatus(dayShift(1),false)).toBe(DEADLINE_STATUS.FUTURE);
 });
 test('normaliza ISO completo antes de classificar',()=>{
  expect(getDeadlineStatus(dayShift(1)+'T08:00:00',false)).toBe(DEADLINE_STATUS.FUTURE);
 });
});

describe('sortByDeadline',()=>{
 test('ordena ascendente e envia sem prazo para o fim',()=>{
  var ts=[mk('c',dayShift(1)),mk('b','2099-12-31'),mk('a','2000-01-01')];
  var o=sortByDeadline(ts);
  expect(o.map(function(t){return t.id;})).toEqual(['a','c','b']);
 });
 test('nao muta o array de entrada e preserva ordem em empates',()=>{
var p=mk('p',dayShift(3));
var q=mk('q',dayShift(3));
var ts=[p,q];
var o=sortByDeadline(ts);
expect(o.map(function(t){return t.id;})).toEqual(['p','q']);
expect(ts.map(function(t){return t.id;})).toEqual(['p','q']);
});
test('envia sem prazo para o fim mesmo com prazos validos presentes',()=>{
var ts=[mk('x',undefined),mk('y',todayKey())];
var o=sortByDeadline(ts);
expect(o.map(function(t){return t.id;})).toEqual(['y','x']);
});
});
