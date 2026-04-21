import { GET } from './route';
import { NextRequest } from 'next/server';
import type { SearchApiResponse } from '@/types';

describe('search API route', () => {
  test('returns empty results for missing query', async () => {
    const req = new NextRequest('http://localhost/api/search');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as SearchApiResponse;
    expect(data.builders).toHaveLength(0);
    expect(data.ecosystems).toHaveLength(0);
    expect(data.total).toBe(0);
  });

  test('returns results for a valid query', async () => {
    const req = new NextRequest('http://localhost/api/search?q=stacks');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as SearchApiResponse;
    expect(data).toHaveProperty('builders');
    expect(data).toHaveProperty('ecosystems');
    expect(data.query).toBe('stacks');
  });

  test('returns 400 for query exceeding max length', async () => {
    const longQuery = 'a'.repeat(201);
    const req = new NextRequest(`http://localhost/api/search?q=${longQuery}`);
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  test('total equals builders + ecosystems count', async () => {
    const req = new NextRequest('http://localhost/api/search?q=defi');
    const res = await GET(req);
    const data = (await res.json()) as SearchApiResponse;
    expect(data.total).toBe(data.builders.length + data.ecosystems.length);
  });

  test('sets Cache-Control header', async () => {
    const req = new NextRequest('http://localhost/api/search?q=test');
    const res = await GET(req);
    expect(res.headers.get('Cache-Control')).toContain('s-maxage');
  });
});
