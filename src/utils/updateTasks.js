// Atualiza imutavelmente a task com id `id` aplicando `f(task)` e devolvendo
// nova lista. Retorna a MESMA referencia quando inaplicavel (lista invalida,
// id nulo, f nao-funcao, task inexistente) - espelho do contrato de reorderTasks.
export default function updateTasks(tasks, id, f) {
  if (!Array.isArray(tasks)) return tasks;
  if (id == null || typeof f !== 'function') return tasks;
  const index = tasks.findIndex(function (t) { return t && t.id === id; });
  if (index < 0) return tasks;
  const current = tasks[index];
  const patched = f(current);
  if (patched === current) return tasks;
  const next = tasks.slice();
  next[index] = patched;
  return next;
}
