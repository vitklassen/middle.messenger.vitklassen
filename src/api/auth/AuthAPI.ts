import type { TSignInRequest, TSignUpRequest, TSignUpResponse, TUserInfoResponse } from '../../models/auth/types';
import HTTPTransport, { IOptions } from '../../services/HTTPTransport';


class AuthAPI {

  private readonly http: HTTPTransport = new HTTPTransport('/auth');

  public async login(userData: TSignInRequest) {
    const options: IOptions = {
      data: userData,
    };
    return this.http.post('/signin', options)
      .then(() => true);
  }

  public async createUser(userData: TSignUpRequest) {
    const options: IOptions = {
      data: userData,
    };
    return this.http.post<TSignUpResponse>('/signup', options).then(() => true);
  }

  public async logoutUser() {
    return this.http.post('/logout').then(() => true);
  }

  public async getUserData() {
    return this.http.get<TUserInfoResponse>('/user')
      .then(response => response);
  }
}

const authAPI = new AuthAPI();
export default authAPI;
