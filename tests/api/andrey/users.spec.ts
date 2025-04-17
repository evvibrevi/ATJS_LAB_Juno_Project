import { test, expect } from '@playwright/test';
import { ApiHelper } from './helpers/apiHelper';
import { userSchema } from './schemas/jsonSchemas';
import { User } from './types/apiTypes';

const apiHelper = new ApiHelper('https://jsonplaceholder.typicode.com');

test.describe('Users API Tests', () => {
  test('GET /users - Fetch all users', async () => {
    const response = await apiHelper.get<User[]>('/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(10);

    const isValid = apiHelper.validateSchema(response.data[0], userSchema);
    expect(isValid).toBe(true);
  });
});
