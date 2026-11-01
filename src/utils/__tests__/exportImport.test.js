// Testes TDD do util export/import JSON.
import { describe, it, expect } from "vitest";
import {
SCHEMA_VERSION,
buildExportFilename,
serializeTasks,
parseTasks,
mergeTasks
} from "../exportImport";

describe("buildExportFilename", function(){
it("gera nome todo-tasks-YYYY-MM-DD.json", function(){
expect(buildExportFilename(new Date(2026,9,31))).toBe("todo-tasks-2026-10-31.json");
});
});

describe("serializeTasks", function(){
it("lista vazia gera JSON com tasks vazio", function(){
var out=JSON.parse(serializeTasks([]));
expect(out.version).toBe(SCHEMA_VERSION);
expect(out.tasks).toEqual([]);
expect(typeof out.exportedAt).toBe("string");
});
it("preserva campos do modelo real da tarefa", function(){
var task={id:"a1",title:"Comprar leite",description:"2L",category:"Personal",checked:true,priority:"alta",tags:["casa"],dueDate:"2026-11-01",recurrence:"daily",subtasks:[]};
var out=JSON.parse(serializeTasks([task]));
expect(out.tasks[0]).toEqual(task);
});
it("entrada nao-array tratada como lista vazia", function(){
var out=JSON.parse(serializeTasks(null));
expect(out.tasks).toEqual([]);
});
});

describe("parseTasks", function(){
it("aceita raiz objeto com version e tasks", function(){
var r=parseTasks(JSON.stringify({version:SCHEMA_VERSION,tasks:[{title:"T1"}]}));
expect(r.ok).toBe(true);
expect(r.tasks).toHaveLength(1);
expect(r.tasks[0].title).toBe("T1");
});
it("aceita raiz array direto", function(){
var r=parseTasks(JSON.stringify([{title:"T2"}]));
expect(r.ok).toBe(true);
expect(r.tasks[0].title).toBe("T2");
});
it("rejeita JSON malformado", function(){
var r=parseTasks("{isso nao e json");
expect(r.ok).toBe(false);
expect(r.error).toBeTruthy();
});
it("rejeita payload sem tasks array", function(){
var r=parseTasks(JSON.stringify({version:SCHEMA_VERSION}));
expect(r.ok).toBe(false);
});
it("rejeita versao incompativel quando informada", function(){
var r=parseTasks(JSON.stringify({version:999,tasks:[]}));
expect(r.ok).toBe(false);
});
it("descarta itens sem title e mantem os validos", function(){
var payload={version:SCHEMA_VERSION,tasks:[{title:""},{title:"Valida"},{},null]};
var r=parseTasks(JSON.stringify(payload));
expect(r.ok).toBe(true);
expect(r.tasks.map(function(t){return t.title;})).toEqual(["Valida"]);
});
});

describe("mergeTasks", function(){
it("mantem lista atual intacta e adiciona novas ao final", function(){
var current=[{id:"a1",title:"A"}];
var incoming=[{id:"b2",title:"B"}];
var result=mergeTasks(current,incoming);
expect(result.map(function(t){return t.id;})).toEqual(["a1","b2"]);
expect(current).toHaveLength(1);
});
it("task com id duplicado recebe novo id via makeId", function(){
var current=[{id:"a1",title:"A"}];
var incoming=[{id:"a1",title:"A duplicada"}];
var result=mergeTasks(current,incoming);
expect(result).toHaveLength(2);
expect(result[0].id).toBe("a1");
expect(result[1].id).not.toBe("a1");
});
it("task sem id recebe novo id via makeId", function(){
var result=mergeTasks([],[{title:"Sem id"}]);
expect(result).toHaveLength(1);
expect(result[0].id).toBeTruthy();
});
it("normaliza campos do modelo real na entrada", function(){
var result=mergeTasks([],[{title:"X",done:true,deadline:"2026-12-01",priority:"alta"}]);
expect(result[0].checked).toBe(true);
expect(result[0].dueDate).toBe("2026-12-01");
});
it("ignora itens invalidos na entrada do merge", function(){
var result=mergeTasks([{id:"a1",title:"A"}],[null,{title:""},{title:"B"}]);
expect(result.map(function(t){return t.title;})).toEqual(["A","B"]);
});
});