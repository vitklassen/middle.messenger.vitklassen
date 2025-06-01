import TUserModel from '../../models/auth/UserModel';
import authAPIInstance from './AuthAPIInstance';

export default class UserAPI {
  public async request() {
    return authAPIInstance.get<TUserModel>('/user')
      .then(response => response);
  }
}
