// Testes TDD do util de persistencia de tarefas em localStorage.
import { describe, it, expect, vi, beforeEach } from "vitest";
import { STORAGE_KEY, loadTasks, saveTasks } from "../taskStorage";

beforeEach(function(){
localStorage.clear();
vi.restoreAllMocks();
});

describe("STORAGE_KEY", function(){
it("usa a chave todo-tasks-v1", function(){
expect(STORAGE_KEY).toBe("todo-tasks-v1");
});
});

describe("loadTasks", function(){
it("retorna lista vazia quando nao ha nada salvo", function(){
expect(loadTasks()).toEqual([]);
});
it("hidrata tarefas validas preservando ids estaveis", function(){
var payload={version:1,tasks:[{id:"a1",title:"Comprar leite"},{id:"b2",title:"Estudar React"}]};
localStorage.setItem(STORAGE_KEY,JSON.stringify(payload));
var out=loadTasks();
expect(out).toHaveLength(2);
expect(out[0].id).toBe("a1");
expect(out[0].title).toBe("Comprar leite");
expect(out[1].id).toBe("b2");
});
it("normaliza campos do modelo real na carga (done vira checked)", function(){
var payload={version:1,tasks:[{id:"a1",title:"X",done:true}]};
localStorage.setItem(STORAGE_KEY,JSON.stringify(payload));
var out=loadTasks();
expect(out[0].checked).toBe(true);
});
it("retorna lista vazia para JSON invalido sem lancar erro", function(){
localStorage.setItem(STORAGE_KEY,"{isso nao e json");
expect(loadTasks()).toEqual([]);
});
it("retorna lista vazia para payload fora do schema (versao incompativel)", function(){
localStorage.setItem(STORAGE_KEY,JSON.stringify({version:999,tasks:[{id:"a",title:"x"}]}));
expect(loadTasks()).toEqual([]);
});
it("retorna lista vazia quando getItem lanca excecao (storage bloqueado)", function(){
vi.spyOn(Storage.prototype,"getItem").mockImplementation(function(){throw new Error("storage bloqueado");});
expect(loadTasks()).toEqual([]);
});
it("descarta itens sem title valido na carga", function(){
var payload={version:1,tasks:[{id:"a1",title:""},{id:"b2",title:"Valida"}]};
localStorage.setItem(STORAGE_KEY,JSON.stringify(payload));
var out=loadTasks();
expect(out.map(function(t){return t.title;})).toEqual(["Valida"]);
});
it("aceita raiz array direta salva no storage", function(){ 	
localStorage.setItem(STORAGE_KEY,"[{\"id\":\"c3\",\"title\":\"Direta\"}]"); 	
var out=loadTasks();
expect(out).toHaveLength(1);
expect(out[0].id).toBe("c3");
});

describe("saveTasks", function(){
it("grava payload com version e tasks sob STORAGE_KEY", function(){
saveTasks([{id:"a1",title:"Comprar leite",checked:false}]);
var raw=JSON.parse(localStorage.getItem(STORAGE_KEY));
expect(raw.version).toBe(1);
expect(raw.tasks).toHaveLength(1);
expect(raw.tasks[0].id).toBe("a1");
});
it("faz round trip completo preservando dados", function(){
var tasks=[{id:"r1",title:"Round trip",checked:true}];
saveTasks(tasks);
expect(loadTasks()).toEqual(tasks);
});
it("nao lanca erro quando setItem falha (storage cheio ou bloqueado)", function(){
vi.spyOn(Storage.prototype,"setItem").mockImplementation(function(){throw new Error("quota excedida");});
expect(function(){saveTasks([{id:"x",title:"Y"}]);}).not.toThrow();
});
it("descarta itens sem title valido na gravacao", function(){
saveTasks([{id:"a1",title:""},{id:"b2",title:"Valida"}]);
var raw=JSON.parse(localStorage.getItem(STORAGE_KEY));
expect(raw.tasks.map(function(t){return t.title;})).toEqual(["Valida"]);
});
});
}); 	
	