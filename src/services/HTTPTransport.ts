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
  
export default class HTTPTransport {
  get = (url: string, options: IOptions = {}): Promise<unknown> => {
    return this.request(url, { ...options, method: METHODS.GET });
  };
  
  post = (url: string, options: IOptions = {}): Promise<unknown>  => {
    return this.request(url, { ...options, method: METHODS.POST });
  };
  
  put = (url: string, options: IOptions = {}): Promise<unknown>  => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };
  
  delete = (url: string, options: IOptions = {}): Promise<unknown>  => { 
    return this.request(url, { ...options, method: METHODS.DELETE });
  };
  
  request = (url: string, options: IOptions = {}): Promise<unknown>  => {
    const { headers = {}, method, data } = options;
  
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }
  
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
  
      xhr.open(
        method, 
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );
  
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
  
      xhr.onload = function () {
        resolve(xhr);
      };
  
      xhr.onabort = reject;
      xhr.onerror = reject;
  
      xhr.timeout = options.timeout || 5000;
      xhr.ontimeout = reject;
  
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
