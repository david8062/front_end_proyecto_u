// environment.ts
const url = 'http://localhost';
const port = '8000';
const apiPath = 'api';

export const environment = {
  production: false,
  url,
  port,
  apiUrl: `${url}:${port}/${apiPath}`, 
};
