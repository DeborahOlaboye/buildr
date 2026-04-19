import { GET } from './route';
import { NextRequest } from 'next/server';
import type { Builder } from '@/types';

describe('builders API route', () => {
  test('returns paginated builders default', async () => {
    const req = new NextRequest('http://localhost/api/builders');
    const res = await GET(req);
    const data = await res.json();
    expect(data).toHaveProperty('builders');
    expect(data).toHaveProperty('total');
  });

  test('applies search query filter', async () => {
    const req = new NextRequest('http://localhost/api/builders?search=alice');
    const res = await GET(req);
    const data = await res.json();
    expect(data.builders.every((b: Builder) =>
      b.name.toLowerCase().includes('alice') ||
      b.handle.toLowerCase().includes('alice'))).toBe(true);
  });
});
