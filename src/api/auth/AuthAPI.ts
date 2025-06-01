import authAPIInstance from './AuthAPIInstance';
import TUserModel from '../../models/auth/UserModel';
import TLoginModel from '../../models/auth/LoginModel';
import { IOptions } from '../../services/HTTPTransport';
import TRegisterModel from '../../models/auth/RegisterModel';

class AuthAPI {

  public async login(userData: TLoginModel) {
    const options: IOptions = {
      data: userData,
    };
    return authAPIInstance.post('/signin', options)
      .then(() => true);
  }

  public async createUser(userData: TRegisterModel) {
    const options: IOptions = {
      data: userData,
    };
    return authAPIInstance.post('/signup', options).then(() => true);
  }

  public async logoutUser() {
    return authAPIInstance.post('/logout').then(() => true);
  }

  public async getUserData() {
    return authAPIInstance.get<TUserModel>('/user')
      .then(response => response);
  }
}

const authAPI = new AuthAPI();
export default authAPI;
