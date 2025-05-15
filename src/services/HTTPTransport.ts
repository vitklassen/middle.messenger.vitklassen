enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IOptions {
  headers?: Record<string, string>;
  method?: METHODS;
  timeout?: number;
  data?: Record<string, string>;
}

function queryStringify(data: object & { [key: string]: string | number | boolean }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
  

