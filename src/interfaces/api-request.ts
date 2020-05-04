import { Auth } from './auth';

export interface ApiRequest {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Record<string, any>;
  auth?: Auth;
  timeout?: number;
}
