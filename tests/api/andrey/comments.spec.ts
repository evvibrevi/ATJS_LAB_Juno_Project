import { test, expect } from '@playwright/test';
import { ApiHelper } from './helpers/apiHelper';
import { commentSchema } from './schemas/jsonSchemas';
import { Comment } from './types/apiTypes';

const apiHelper = new ApiHelper('https://jsonplaceholder.typicode.com');

test.describe('Comments API Tests', () => {
  test('GET /comments?postId=1 - Filter comments by postId', async () => {
    const response = await apiHelper.get<Comment[]>('/comments?postId=1');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);

    response.data.forEach((comment) => {
      expect(comment.postId).toBe(1);
    });

    const isValid = apiHelper.validateSchema(response.data[0], commentSchema);
    expect(isValid).toBe(true);
  });
});
