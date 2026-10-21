import { extractTags, countTasksByTag, tasksMatchSelectedTags } from '../tags';

const TASKS = [
  { id: 1, title: 'A', tags: ['casa', 'urgente'] },
  { id: 2, title: 'B', tags: ['trabalho'] },
  { id: 3, title: 'C', tags: ['casa'] },
  { id: 4, title: 'D', tags: [] },
];

test('extractTags retorna lista unica na ordem da primeira aparicao', () => {
  expect(extractTags(TASKS)).toEqual(['casa', 'urgente', 'trabalho']);
});

test('extractTags ignora tarefas sem tags e normaliza espacos', () => {
  const tasks = [
    { id: 1, tags: [' casa ', 'casa'] },
    { id: 2 },
    null,
    { id: 3, tags: 'invalido' },
    { id: 4, tags: [''] },
  ];
  expect(extractTags(tasks)).toEqual(['casa']);
});

test('extractTags com entrada invalida retorna array vazio', () => {
  expect(extractTags(null)).toEqual([]);
  expect(extractTags(undefined)).toEqual([]);
});

test('countTasksByTag conta tarefas por tag', () => {
  expect(countTasksByTag(TASKS)).toEqual({ casa: 2, urgente: 1, trabalho: 1 });
});

test('countTasksByTag com entrada invalida retorna objeto vazio', () => {
  expect(countTasksByTag(null)).toEqual({});
});

test('tasksMatchSelectedTags sem selecao retorna todas as tarefas', () => {
  expect(tasksMatchSelectedTags(TASKS, [])).toHaveLength(4);
  expect(tasksMatchSelectedTags(TASKS, undefined)).toHaveLength(4);
});

test('tasksMatchSelectedTags filtra por uma tag (OR)', () => {
  const result = tasksMatchSelectedTags(TASKS, ['casa']);
  expect(result.map((t) => t.id)).toEqual([1, 3]);
});

test('tasksMatchSelectedTags casa tags case-insensitive', () => {
  const tasks = [{ id: 9, title: 'X', tags: ['Casa'] }];
  expect(tasksMatchSelectedTags(tasks, ['casa'])).toHaveLength(1);
});

test('extractTags deduplica e normaliza para minusculas', () => {
  expect(extractTags([{ id: 1, tags: ['Casa', 'CASA', ' casa '] }])).toEqual(['casa']);
});
