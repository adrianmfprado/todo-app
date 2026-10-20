import { describe, it, expect } from 'vitest';
import reorderTasks from '../reorderTasks';

const A = { id: 'a', title: 'A' };
const B = { id: 'b', title: 'B' };
const C = { id: 'c', title: 'C' };

describe('reorderTasks', () => {
  it('move item para frente imutavelmente', () => {
    const list = [A, B, C];
    const result = reorderTasks(list, 'a', 'c');
    expect(result.map((t) => t.id)).toEqual(['b', 'c', 'a']);
    expect(result).not.toBe(list);
    expect(list.map((t) => t.id)).toEqual(['a', 'b', 'c']);
  });

  it('move item para tras preservando demais itens', () => {
    const result = reorderTasks([A, B, C], 'c', 'a');
    expect(result.map((t) => t.id)).toEqual(['c', 'a', 'b']);
  });

  it('retorna mesma referencia quando ids sao iguais', () => {
    const list = [A, B];
    expect(reorderTasks(list, 'a', 'a')).toBe(list);
  });

  it('retorna mesma referencia quando id de origem nao existe', () => {
    const list = [A, B];
    expect(reorderTasks(list, 'x', 'b')).toBe(list);
  });

  it('retorna mesma referencia quando id de destino nao existe', () => {
    const list = [A, B];
    expect(reorderTasks(list, 'a', 'x')).toBe(list);
  });

  it('retorna mesma referencia para lista unitaria e entradas nulas', () => {
    const single = [A];
    expect(reorderTasks(single, A.id, A.id)).toBe(single);
    expect(reorderTasks(null, A.id, B.id)).toBe(null);
    expect(reorderTasks(undefined, A.id, B.id)).toBe(undefined);
  });

  it('nao muta a lista original em caso de sucesso', () => {
    const list = [A, B, C];
    reorderTasks(list, C.id, A.id);
    expect(list.map((t) => t.id)).toEqual(['a', 'b', 'c']);
  });
});
