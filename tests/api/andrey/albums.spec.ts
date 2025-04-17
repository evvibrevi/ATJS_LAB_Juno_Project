import { test, expect } from '@playwright/test';
import { ApiHelper } from './helpers/apiHelper';
import { photoSchema } from './schemas/jsonSchemas';
import { Photo } from './types/apiTypes';

const apiHelper = new ApiHelper('https://jsonplaceholder.typicode.com');

test.describe('Albums API Tests', () => {
  test('GET /albums/1/photos - Fetch photos for an album', async () => {
    const response = await apiHelper.get<Photo[]>('/albums/1/photos');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);

    response.data.forEach((photo) => {
      expect(photo.albumId).toBe(1);
    });

    const isValid = apiHelper.validateSchema(response.data[0], photoSchema);
    expect(isValid).toBe(true);
  });
});
