import { IOptions } from '../../services/HTTPTransport';
import authAPIInstance from './AuthAPIInstance';
import TRegisterModel from '../../models/auth/RegisterModel';

export default class RegisterAPI {
  public createUser(userData: TRegisterModel) {
    const options: IOptions = {
      data: userData,
    };
    return authAPIInstance.post<{ id: string }>('/signup', options).then(response => response.id);
  }
}
