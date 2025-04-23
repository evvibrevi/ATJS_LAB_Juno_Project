import { test, expect } from '@playwright/test';
import { api } from './apiClient';

test('Get posts', async () => {
  const response = await api.get('/posts');

  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBe(100);

  for (const post of response.data) {
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
    console.log(response.data)
  }
});

test('Get post by ID', async () => {
  const postId = 1;
  const response = await api.get(`/posts/${postId}`);

  expect(response.status).toBe(200);

  const post = response.data;

  expect(post.id).toBe(postId);
  expect(post).toHaveProperty('title');
  expect(post).toHaveProperty('body');
  expect(post).toHaveProperty('userId');
  console.log(response.data)
});

test('Get post which not exist', async () => {
  const response = await api.get('/posts/9999', {
    validateStatus: () => true,
  });
  expect(response.status).toBe(404);
  const data = response.data;
  expect(data).toEqual({});
});

test('Create new post', async () => {
  const newPost = {
    title: 'New test post',
    body: 'This is test content',
    userId: 1,
  };

  const response = await api.post('/posts', newPost);
  expect(response.status).toBe(201);
  const created = response.data;
  expect(created).toHaveProperty('id'); // id = 101 в JSONPlaceholder
  expect(created.title).toBe(newPost.title);
  expect(created.body).toBe(newPost.body);
  expect(created.userId).toBe(newPost.userId);
});

test('Create incomplete post', async () => {
  const partialPost = {
    title: 'Only title',
  };
  const response = await api.post('/posts', partialPost);
  expect(response.status).toBe(201);
  const created = response.data;
  expect(created).toHaveProperty('id');
  expect(created.title).toBe(partialPost.title);
  expect(created).not.toHaveProperty('body');
  expect(created).not.toHaveProperty('userId');
});

test('Update the post', async () => {
  const updatedPost = {
    id: 1,
    title: 'Updated title',
    body: 'Updated body',
    userId: 1,
  };
  const response = await api.put('/posts/1', updatedPost);
  expect(response.status).toBe(200);
  const result = response.data;
  expect(result.id).toBe(updatedPost.id);
  expect(result.title).toBe(updatedPost.title);
  expect(result.body).toBe(updatedPost.body);
  expect(result.userId).toBe(updatedPost.userId);
});

test('Partial update', async () => {
  const patchData = {
    title: 'Patched title',
  };

  const response = await api.patch('/posts/1', patchData);
  expect(response.status).toBe(200);
  const result = response.data;
  expect(result.title).toBe(patchData.title);
  expect(result).toHaveProperty('id', 1);
  expect(result).toHaveProperty('body');
  expect(result).toHaveProperty('userId');
});

test('Delete post', async () => {
  const response = await api.delete('/posts/1');
  expect(response.status).toBe(200);
  expect(response.data).toEqual({});
});

test('Get comments', async () => {
  const response = await api.get('/posts/1/comments');
  expect(response.status).toBe(200);
  const comments = response.data;
  expect(Array.isArray(comments)).toBe(true);
  expect(comments.length).toBeGreaterThan(0); // Обычно 5
  for (const comment of comments) {
    expect(comment).toHaveProperty('id');
    expect(comment).toHaveProperty('name');
    expect(comment).toHaveProperty('email');
    expect(comment).toHaveProperty('body');
  }
});

test('Get list of users', async () => {
  const response = await api.get('/users');
  expect(response.status).toBe(200);
  const users = response.data;
  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBe(10);
  for (const user of users) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('company');
  }
});