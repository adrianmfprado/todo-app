import { describe, expect, test } from 'vitest';
import updateTasks from '../updateTasks';

const t1 = { id: 1, title: 'A' };
const t2 = { id: 2, title: 'B' };
const t3 = { id: 3, title: 'C' };

describe('updateTasks', () => {
  test('atualiza a task alvo imutavelmente preservando referencias vizinhas', () => {
    const list = [t1, t2, t3];
    const next = updateTasks(list, 2, function (t) { return { ...t, title: 'B2' }; });
    expect(next).not.toBe(list);
    expect(next[1].title).toBe('B2');
    expect(next[0]).toBe(t1);
    expect(next[2]).toBe(t3);
    expect(list[1].title).toBe('B');
  });

  test('retorna mesma referencia para lista invalida', () => {
    expect(updateTasks(null, 1, function (t) { return t; })).toBe(null);
    expect(updateTasks(undefined, 1, function (t) { return t; })).toBe(undefined);
  });

  test('retorna mesma referencia para id nulo ou f nao-funcao', () => {
    const list = [t1];
    expect(updateTasks(list, null, function (t) { return t; })).toBe(list);
    expect(updateTasks(list, undefined, function (t) { return t; })).toBe(list);
    expect(updateTasks(list, 1, null)).toBe(list);
    expect(updateTasks(list, 1, undefined)).toBe(list);
  });

  test('retorna mesma referencia quando id nao existe', () => {
    const list = [t1];
    expect(updateTasks(list, 99, function (t) { return { ...t }; })).toBe(list);
  });

  test('retorna mesma referencia quando f devolve a propria task', () => {
    const list = [t1];
    expect(updateTasks(list, 1, function (t) { return t; })).toBe(list);
  });
});
