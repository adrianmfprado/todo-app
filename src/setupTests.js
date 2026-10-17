import { vi } from 'vitest';

// Shim de compatibilidade: as suítes foram escritas para a API do Jest
// (jest.fn(), jest.spyOn(), etc.). Sob Vitest, expomos `vi` como `jest`
// global para que esses testes rodem sem reescrita completa.
globalThis.jest = vi;

import '@testing-library/jest-dom';
