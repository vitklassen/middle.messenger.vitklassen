import authAPIInstance from './AuthAPIInstance';

export default class LogoutAPI{
  public create(): Promise<unknown> {
    return authAPIInstance.post('/logout');
  }
}
