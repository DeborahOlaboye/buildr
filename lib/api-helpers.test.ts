import { parseIntParam, clamp } from './api-helpers';

describe('parseIntParam', () => {
  test('returns fallback for null', () => {
    expect(parseIntParam(null, 10)).toBe(10);
  });

  test('parses a valid integer string', () => {
    expect(parseIntParam('25', 10)).toBe(25);
  });

  test('returns fallback for NaN string', () => {
    expect(parseIntParam('abc', 10)).toBe(10);
  });

  test('returns fallback for empty string', () => {
    expect(parseIntParam('', 5)).toBe(5);
  });

  test('handles negative numbers', () => {
    expect(parseIntParam('-1', 0)).toBe(-1);
  });
});

describe('clamp', () => {
  test('returns value when within range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  test('clamps to min', () => {
    expect(clamp(-5, 1, 10)).toBe(1);
  });

  test('clamps to max', () => {
    expect(clamp(100, 1, 10)).toBe(10);
  });

  test('returns min when value equals min', () => {
    expect(clamp(1, 1, 10)).toBe(1);
  });

  test('returns max when value equals max', () => {
    expect(clamp(10, 1, 10)).toBe(10);
  });
});
