export const postSchema = {
  type: 'object',
  required: ['id', 'title', 'body', 'userId'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    body: { type: 'string' },
    userId: { type: 'number' },
  },
};

export const commentSchema = {
  type: 'object',
  required: ['postId', 'id', 'name', 'email', 'body'],
  properties: {
    postId: { type: 'number' },
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    body: { type: 'string' },
  },
};

export const userSchema = {
  type: 'object',
  required: ['id', 'name', 'username', 'email'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
};

export const photoSchema = {
  type: 'object',
  required: ['albumId', 'id', 'title', 'url', 'thumbnailUrl'],
  properties: {
    albumId: { type: 'number' },
    id: { type: 'number' },
    title: { type: 'string' },
    url: { type: 'string', format: 'uri' },
    thumbnailUrl: { type: 'string', format: 'uri' },
  },
};

export const todoSchema = {
  type: 'object',
  required: ['userId', 'id', 'title', 'completed'],
  properties: {
    userId: { type: 'number' },
    id: { type: 'number' },
    title: { type: 'string' },
    completed: { type: 'boolean' },
  },
};
