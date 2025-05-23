import HTTP from '../services/HTTPTransport';

const authAPIInstance = new HTTP('/auth');

export default class AuthAPI { 
  createUser(): Promise<unknown> {
    return authAPIInstance.post('/signup');
  }
}
