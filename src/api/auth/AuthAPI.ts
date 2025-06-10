import authAPIInstance from './AuthAPIInstance';
import TSignInRequest from '../../models/auth/SignInRequest';
import TSignUpRequest from '../../models/auth/SignUpRequest';
import TSignUpResponse from '../../models/auth/SignUpResponse';
import TUserResponse from '../../models/auth/UserResponse';
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
    return authAPIInstance.get<TUserResponse>('/user')
      .then(response => response);
  }
}

const authAPI = new AuthAPI();
export default authAPI;
