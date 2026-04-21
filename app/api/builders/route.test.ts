import { GET } from './route';
import { NextRequest } from 'next/server';
import type { Builder, BuildersApiResponse } from '@/types';

describe('builders API route', () => {
  test('returns paginated builders default', async () => {
    const req = new NextRequest('http://localhost/api/builders');
    const res = await GET(req);
    const data = (await res.json()) as BuildersApiResponse;
    expect(data).toHaveProperty('builders');
    expect(data).toHaveProperty('total');
    expect(res.status).toBe(200);
  });

  test('applies search query filter', async () => {
    const req = new NextRequest('http://localhost/api/builders?search=alice');
    const res = await GET(req);
    const data = (await res.json()) as BuildersApiResponse;
    expect(data.builders.every((b: Builder) =>
      b.name.toLowerCase().includes('alice') ||
      b.handle.toLowerCase().includes('alice'))).toBe(true);
  });

  test('handles NaN page param gracefully', async () => {
    const req = new NextRequest('http://localhost/api/builders?page=abc');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as BuildersApiResponse;
    expect(data.page).toBe(1);
  });

  test('handles NaN limit param and falls back to 10', async () => {
    const req = new NextRequest('http://localhost/api/builders?limit=xyz');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as BuildersApiResponse;
    expect(data.rowsPerPage).toBe(10);
  });

  test('sets Cache-Control header', async () => {
    const req = new NextRequest('http://localhost/api/builders');
    const res = await GET(req);
    expect(res.headers.get('Cache-Control')).toContain('s-maxage');
  });
});
