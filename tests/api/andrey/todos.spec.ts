import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../../helpers/apiHelper';
import { todoSchema } from '../../../apiSchemas/jsonSchemas';
import { Todo } from '../../../types/apiTypes';

const apiHelper = new ApiHelper('https://jsonplaceholder.typicode.com');

test.describe('Todos API Tests', () => {
  test('GET /todos?completed=true - Filter todos by completion', async () => {
    const response = await apiHelper.get<Todo[]>('/todos?completed=true');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);

    const isValid = apiHelper.validateArraySchema(response.data, todoSchema);
    expect(isValid).toBe(true);

    response.data.forEach((todo) => {
      expect(todo.completed).toBe(true);
    });
  });
});
