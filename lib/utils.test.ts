import { formatSTX, truncateAddress, formatRelativeTime } from './utils';

describe('utils', () => {
  test('formatSTX formats numbers correctly', () => {
    expect(formatSTX(1234.5)).toBe('1,234.50');
    expect(formatSTX(0)).toBe('0.00');
  });

  test('truncateAddress shortens correctly', () => {
    expect(truncateAddress('abcdef123456', 4)).toBe('abcd...3456');
    expect(truncateAddress('', 4)).toBe('');
  });

  test('formatRelativeTime returns human readable strings', () => {
    const now = new Date().toISOString();
    expect(formatRelativeTime(now)).toBe('just now');
  });
});
