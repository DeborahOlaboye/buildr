import { GET } from './route';
import { NextRequest } from 'next/server';
import type { EcosystemsApiResponse } from '@/types';

describe('ecosystems API route', () => {
  test('returns ecosystems with default params', async () => {
    const req = new NextRequest('http://localhost/api/ecosystems');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as EcosystemsApiResponse;
    expect(data).toHaveProperty('ecosystems');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('stats');
  });

  test('filters by valid category', async () => {
    const req = new NextRequest('http://localhost/api/ecosystems?category=DeFi');
    const res = await GET(req);
    const data = (await res.json()) as EcosystemsApiResponse;
    expect(data.ecosystems.every((e) => e.category === 'DeFi')).toBe(true);
  });

  test('falls back to All for invalid category', async () => {
    const req = new NextRequest('http://localhost/api/ecosystems?category=Invalid');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as EcosystemsApiResponse;
    expect(data.ecosystems.length).toBeGreaterThan(0);
  });

  test('handles NaN page param gracefully', async () => {
    const req = new NextRequest('http://localhost/api/ecosystems?page=foo');
    const res = await GET(req);
    expect(res.status).toBe(200);
  });

  test('returns featured ecosystems', async () => {
    const req = new NextRequest('http://localhost/api/ecosystems');
    const res = await GET(req);
    const data = (await res.json()) as EcosystemsApiResponse;
    expect(Array.isArray(data.featured)).toBe(true);
  });

  test('sets Cache-Control header', async () => {
    const req = new NextRequest('http://localhost/api/ecosystems');
    const res = await GET(req);
    expect(res.headers.get('Cache-Control')).toContain('s-maxage');
  });
});
