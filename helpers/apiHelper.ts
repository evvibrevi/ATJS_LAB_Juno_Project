import axios, { AxiosResponse } from 'axios';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export class ApiHelper {
  readonly baseUrl: string;
  readonly ajv: Ajv;

  constructor(baseUrl: string = 'https://jsonplaceholder.typicode.com') {
    this.baseUrl = baseUrl;
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
  }

  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
      return await axios.get<T>(`${this.baseUrl}${endpoint}`);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      }
      console.error(`Error making GET request to ${endpoint}:`, error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data: object): Promise<AxiosResponse<T>> {
    try {
      return await axios.post<T>(`${this.baseUrl}${endpoint}`, data);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      }
      console.error(`Error making POST request to ${endpoint}:`, error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data: object): Promise<AxiosResponse<T>> {
    try {
      return await axios.put<T>(`${this.baseUrl}${endpoint}`, data);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      }
      console.error(`Error making PUT request to ${endpoint}:`, error);
      throw error;
    }
  }

  async patch<T>(endpoint: string, data: object): Promise<AxiosResponse<T>> {
    try {
      return await axios.patch<T>(`${this.baseUrl}${endpoint}`, data);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      }
      console.error(`Error making PATCH request to ${endpoint}:`, error);
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
      return await axios.delete<T>(`${this.baseUrl}${endpoint}`);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      }
      console.error(`Error making DELETE request to ${endpoint}:`, error);
      throw error;
    }
  }

  validateSchema(data: object, schema: object): boolean {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
    }

    return valid;
  }

  validateArraySchema<T extends object>(data: T[], schema: object): boolean {
    if (!Array.isArray(data)) {
      console.error('Data is not an array');
      return false;
    }

    for (let i = 0; i < data.length; i++) {
      const valid = this.validateSchema(data[i], schema);
      if (!valid) {
        console.error(`Item at index ${i} failed validation`);
        return false;
      }
    }

    return true;
  }
}
