import { IOptions } from '../../services/HTTPTransport';
import authAPIInstance from './AuthAPIInstance';
import TRegisterModel from '../../models/auth/RegisterModel';

export default class RegisterAPI {
  public create(userData: TRegisterModel) {
    const options: IOptions = {
      headers: {
        'content-type': 'application/json',
      },
      data: userData,
    };
    return authAPIInstance.post<{id: string}>('/signup', options).then(response => response.id);
  }
}
