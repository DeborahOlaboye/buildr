import { GET } from './route';

describe('health API route', () => {
  test('returns status ok with 200', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('ok');
  });

  test('returns a valid ISO timestamp', async () => {
    const res = await GET();
    const data = await res.json();
    expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
  });

  test('sets no-store Cache-Control header', async () => {
    const res = await GET();
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });

  test('includes version and environment fields', async () => {
    const res = await GET();
    const data = await res.json();
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('environment');
    expect(data).toHaveProperty('liveData');
  });
});
