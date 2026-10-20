// Reordena imutavelmente uma lista de tarefas movendo o item com id `fromId`
// para a posicao do item com id `toId`. Retorna a MESMA referencia se a
// operacao nao for aplicavel (ids invalidos, iguais, lista pequena demais).
export default function reorderTasks(tasks, fromId, toId) {
  if (!Array.isArray(tasks)) return tasks;
  if (fromId == null || toId == null) return tasks;
  if (fromId === toId) return tasks;
  const fromIndex = tasks.findIndex(function (t) { return t && t.id === fromId; });
  const toIndex = tasks.findIndex(function (t) { return t && t.id === toId; });
  if (fromIndex < 0 || toIndex < 0) return tasks;
  if (tasks.length < 2) return tasks;
  const next = tasks.slice();
  const moved = next.splice(fromIndex, 1)[0];
  next.splice(toIndex, 0, moved);
  return next;
}
