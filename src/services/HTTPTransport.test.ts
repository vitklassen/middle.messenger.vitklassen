import Sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport, { METHODS } from './HTTPTransport';
/* eslint-disable @typescript-eslint/no-floating-promises */
describe('HTTTransport', () => {
  let http: HTTPTransport;

  beforeEach(() => {
    http = new HTTPTransport('');
  });
  it('Проверка работы метода get', () => {
    const spyGet = Sinon.spy(http, 'request');
    http.get('test', { data: { test: 'test' }, method: 
    METHODS.GET });

    expect(spyGet.calledOnceWith('test', { data: { test: 'test' }, method: 
    METHODS.GET })).to.eq(true);
  });
});
