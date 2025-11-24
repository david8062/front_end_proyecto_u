// environment.ts
const url = 'http://localhost';
const port = '3000';
const apiPath = 'api/v1';

export const environment = {
  production: false,
  url,
  port,
  apiUrl: `${url}:${port}/${apiPath}`, 
};
