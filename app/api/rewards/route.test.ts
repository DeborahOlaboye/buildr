import { GET } from './route';
import type { RewardsApiResponse } from '@/types';

describe('rewards API route', () => {
  test('returns 200 with program data', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = (await res.json()) as RewardsApiResponse;
    expect(data).toHaveProperty('program');
    expect(data).toHaveProperty('topBuilders');
    expect(data).toHaveProperty('totalBuilders');
  });

  test('topBuilders is sorted by monthly reward descending', async () => {
    const res = await GET();
    const data = (await res.json()) as RewardsApiResponse;
    for (let i = 1; i < data.topBuilders.length; i++) {
      expect(data.topBuilders[i - 1].monthlyReward).toBeGreaterThanOrEqual(
        data.topBuilders[i].monthlyReward
      );
    }
  });

  test('returns at most 10 top builders', async () => {
    const res = await GET();
    const data = (await res.json()) as RewardsApiResponse;
    expect(data.topBuilders.length).toBeLessThanOrEqual(10);
  });

  test('sets Cache-Control header', async () => {
    const res = await GET();
    expect(res.headers.get('Cache-Control')).toContain('s-maxage');
  });

  test('includes faqItems array', async () => {
    const res = await GET();
    const data = (await res.json()) as RewardsApiResponse;
    expect(Array.isArray(data.faqItems)).toBe(true);
  });
});
