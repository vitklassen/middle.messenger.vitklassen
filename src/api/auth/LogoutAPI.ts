import authAPIInstance from './AuthAPIInstance';

export default class LogoutAPI {
  public logoutUser(): Promise<unknown> {
    return authAPIInstance.post('/logout').then(() => true);
  }
}
