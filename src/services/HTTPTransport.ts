import ENV from '../utils/env';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IOptions {
  headers?: Record<string, string>;
  method?: METHODS;
  timeout?: number;
  data?: Record<string, string | number | number []> | FormData;
  signal?: AbortSignal;
  responseType?: XMLHttpRequestResponseType;
  withCredentials?: boolean;
}

function queryStringify(data: object & { [key: string]: string | number | boolean}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
  
export default class HTTPTransport {
  endpoint: string;

  constructor(url: string) {
    this.endpoint = ENV.HOST + url;
  }

  get<TResponse>(urlPart: string, options: IOptions = {}): Promise<TResponse> {
    return this.request(urlPart, { ...options, method: METHODS.GET });
  }
  
  post<TResponse>(urlPart: string, options: IOptions = {}): Promise<TResponse> {
    return this.request(urlPart, { ...options, method: METHODS.POST });
  }
  
  put<TResponse>(urlPart: string, options: IOptions = {}): Promise<TResponse> {
    return this.request(urlPart, { ...options, method: METHODS.PUT });
  }
  
  delete<TResponse>(urlPart: string, options: IOptions = {}): Promise<TResponse> { 
    return this.request(urlPart, { ...options, method: METHODS.DELETE });
  }
  
  request<TResponse>(urlPart: string, options: IOptions = {}): Promise<TResponse> {
    const { headers = {}, method, data, signal, responseType = 'json', withCredentials = true } = options;
    const baseUrl = this.endpoint;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }
  
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      const isFormData = data instanceof FormData;
      xhr.open(
        method, 
        isGet && !!data && !isFormData
          ? `${baseUrl + urlPart}${queryStringify(data as Record<string, string | number | number>)}`
          : baseUrl + urlPart,
      );

      if (signal) {
        signal.onabort = () => {xhr.abort();};
      }
  
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
  
      xhr.onload = function () {
        const status = xhr.status || 0;
        if (status >= 200 && status < 300) {
          resolve(xhr.response);
        } else {
          reject({ reason: 'unknown error' });
        }
      };
  
      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout error' });

      xhr.timeout = options.timeout || 5000;
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;
  
      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
