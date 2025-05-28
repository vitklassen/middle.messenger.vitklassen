import { IOptions } from '../../services/HTTPTransport';
import authAPIInstance from './AuthAPIInstance';
import TLoginRequest from '../../models/auth/LoginModel';

export default class LoginAPI{
  public async create(userData: TLoginRequest) {
    const options: IOptions = {
      headers: {
        'content-type': 'application/json',
      },
      data: userData,
    };
    return authAPIInstance.post('/signin', options)
    .then(() => true);
  }
}