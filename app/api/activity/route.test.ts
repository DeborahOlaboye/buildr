import { GET } from './route';
import { NextRequest } from 'next/server';
import type { ActivityApiResponse } from '@/types';

describe('activity API route', () => {
  test('returns activity items with default limit', async () => {
    const req = new NextRequest('http://localhost/api/activity');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as ActivityApiResponse;
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.items.length).toBeLessThanOrEqual(20);
  });

  test('respects custom limit param', async () => {
    const req = new NextRequest('http://localhost/api/activity?limit=5');
    const res = await GET(req);
    const data = (await res.json()) as ActivityApiResponse;
    expect(data.items.length).toBeLessThanOrEqual(5);
  });

  test('clamps limit to maximum of 100', async () => {
    const req = new NextRequest('http://localhost/api/activity?limit=999');
    const res = await GET(req);
    const data = (await res.json()) as ActivityApiResponse;
    expect(data.items.length).toBeLessThanOrEqual(100);
  });

  test('handles NaN limit param gracefully', async () => {
    const req = new NextRequest('http://localhost/api/activity?limit=abc');
    const res = await GET(req);
    expect(res.status).toBe(200);
  });

  test('sets Cache-Control header', async () => {
    const req = new NextRequest('http://localhost/api/activity');
    const res = await GET(req);
    expect(res.headers.get('Cache-Control')).toContain('s-maxage');
  });
});
