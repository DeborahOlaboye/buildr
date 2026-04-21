import { GET } from './route';
import type { PricingApiResponse } from '@/types';

describe('pricing API route', () => {
  test('returns 200 with pricing tiers', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = (await res.json()) as PricingApiResponse;
    expect(Array.isArray(data.tiers)).toBe(true);
    expect(data.tiers.length).toBeGreaterThan(0);
  });

  test('includes features and faq arrays', async () => {
    const res = await GET();
    const data = (await res.json()) as PricingApiResponse;
    expect(Array.isArray(data.features)).toBe(true);
    expect(Array.isArray(data.faq)).toBe(true);
  });

  test('sets a long Cache-Control header', async () => {
    const res = await GET();
    const cc = res.headers.get('Cache-Control') ?? '';
    expect(cc).toContain('s-maxage');
    const match = cc.match(/s-maxage=(\d+)/);
    const maxAge = match ? parseInt(match[1], 10) : 0;
    expect(maxAge).toBeGreaterThanOrEqual(300);
  });
});
