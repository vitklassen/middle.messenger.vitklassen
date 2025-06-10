import TUserRequset from '../../models/users/UserRequest';
import TUserResponse from '../../models/users/UserResponse';
import TUserSearchModel from '../../models/users/UserSearchModel';
import TChangePasswordRequest from '../../models/users/ChangePasswordRequest';
import { IOptions } from '../../services/HTTPTransport';
import userAPIInstance from './UserAPIInstance';

class UserAPI {
  public async changeUserData(userData: TUserRequset) {
    const options: IOptions = {
      data: userData,
    };
    return userAPIInstance.put<TUserResponse>('/profile', options).then(response => response);
  }

  public async changeUserAvatar(newAvatar: FormData) {
    const options: IOptions = {
      data: newAvatar,
    };
    return userAPIInstance.put<TUserResponse>('/profile/avatar', options).then(response => response);
  }

  public async changeUserPassword(passwordData: TChangePasswordRequest) {
    const options: IOptions = {
      data: passwordData,
    };
    return userAPIInstance.put('/password', options).then(() => true);
  }

  public async findUser(searchData: TUserSearchModel) {
    const options: IOptions = {
      data: searchData,
    };
    return userAPIInstance.post<TUserResponse[]>('/search', options).then(response => response);
  }
}

const userAPI = new UserAPI();
export default userAPI;
