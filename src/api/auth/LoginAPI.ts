import { IOptions } from '../../services/HTTPTransport';
import authAPIInstance from './AuthAPIInstance';
import TLoginModel from '../../models/auth/LoginModel';

export default class LoginAPI {
  public async create(userData: TLoginModel): Promise<boolean> {
    const options: IOptions = {
      data: userData,
    };
    return authAPIInstance.post('/signin', options)
      .then(() => true);
  }
}