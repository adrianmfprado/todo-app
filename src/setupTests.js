import { vi, beforeEach } from 'vitest';

// Shim de compatibilidade: as suítes foram escritas para a API do Jest
// (jest.fn(), jest.spyOn(), etc.). Sob Vitest, expomos `vi` como `jest`
// global para que esses testes rodem sem reescrita completa.
globalThis.jest = vi;

// Isolamento de storage entre testes: com a persistência em localStorage
// ativa na Home, o estado vaza entre suítes se o storage não for limpo
// antes de cada teste (hidratação duplica tarefas do teste anterior).
beforeEach(function(){
localStorage.clear();
});

import '@testing-library/jest-dom';
