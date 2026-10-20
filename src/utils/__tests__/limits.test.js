import { describe, expect } from 'vitest';
import { MAX_CHARS } from '../limits';

describe('limits', () => {
  test('MAX_CHARS e 500', () => {
    expect(MAX_CHARS).toBe(500);
  });
});
