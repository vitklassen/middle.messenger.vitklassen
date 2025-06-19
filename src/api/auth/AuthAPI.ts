import authAPIInstance from './AuthAPIInstance';
import type { TSignInRequest, TSignUpRequest, TSignUpResponse, TUserInfoResponse } from '../../models/auth/types';
import { IOptions } from '../../services/HTTPTransport';


class AuthAPI {

  public async login(userData: TSignInRequest) {
    const options: IOptions = {
      data: userData,
    };
    return authAPIInstance.post('/signin', options)
      .then(() => true);
  }

  public async createUser(userData: TSignUpRequest) {
    const options: IOptions = {
      data: userData,
    };
    return authAPIInstance.post<TSignUpResponse>('/signup', options).then(() => true);
  }

  public async logoutUser() {
    return authAPIInstance.post('/logout').then(() => true);
  }

  public async getUserData() {
    return authAPIInstance.get<TUserInfoResponse>('/user')
      .then(response => response);
  }
}

const authAPI = new AuthAPI();
export default authAPI;
