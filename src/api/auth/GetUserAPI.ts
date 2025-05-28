import TUserResponse from '../../models/auth/UserModel';
import authAPIInstance from './AuthAPIInstance';

export default class UserAPI {
  async request() {
    return authAPIInstance.get<TUserResponse>('/user')
    .then(response => response);
  }
}
