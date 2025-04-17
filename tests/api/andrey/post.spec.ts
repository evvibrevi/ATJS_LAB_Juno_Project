import { test, expect } from '@playwright/test';
import { ApiHelper } from './helpers/apiHelper';
import { postSchema } from './schemas/jsonSchemas';
import { Post } from './types/apiTypes';

const apiHelper = new ApiHelper('https://jsonplaceholder.typicode.com');

test.describe('Posts API Tests', () => {
  test('GET /posts/{id} - Fetch a single post by ID', async () => {
    const response = await apiHelper.get<Post>('/posts/1');

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);

    const isValid = apiHelper.validateSchema(response.data, postSchema);
    expect(isValid).toBe(true);
  });

  test('GET /posts/99999 - Try to fetch non-existent post', async () => {
    const response = await apiHelper.get<{}>('/posts/99999');

    expect(response.status).toBe(404);
    expect(response.data).toEqual({});
  });

  test('POST /posts - Create a new post', async () => {
    const newPost: Omit<Post, 'id'> = {
      title: 'New Post',
      body: 'This is a test post',
      userId: 1,
    };

    const response = await apiHelper.post<Post>('/posts', newPost);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.title).toBe(newPost.title);
    expect(response.data.body).toBe(newPost.body);
    expect(response.data.userId).toBe(newPost.userId);
  });

  test('PUT /posts/1 - Replace an existing post', async () => {
    const updatedPost: Post = {
      id: 1,
      title: 'Updated Post',
      body: 'Updated content',
      userId: 1,
    };

    const response = await apiHelper.put<Post>('/posts/1', updatedPost);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(updatedPost);
  });

  test('PATCH /posts/1 - Partially update a post', async () => {
    const partialUpdate: Partial<Post> = {
      title: 'Patched Title',
    };

    const response = await apiHelper.patch<Post>('/posts/1', partialUpdate);

    expect(response.status).toBe(200);
    expect(response.data.title).toBe(partialUpdate.title);
  });

  test('DELETE /posts/1 - Delete a post', async () => {
    const response = await apiHelper.delete<{}>('/posts/1');

    expect(response.status).toBe(200);
    expect(response.data).toEqual({});
  });
});
