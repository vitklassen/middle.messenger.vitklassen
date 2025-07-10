import { TUserRequset, TUserResponse, TUserSearchModel, TChangePasswordRequest } from '../../models/users/types';
import HTTPTransport, { IOptions } from '../../services/HTTPTransport';

class UserAPI {

  private readonly http: HTTPTransport = new HTTPTransport('/user');

  public async changeUserData(userData: TUserRequset) {
    const options: IOptions = {
      data: userData,
    };
    return this.http.put<TUserResponse>('/profile', options).then(response => response);
  }

  public async changeUserAvatar(newAvatar: FormData) {
    const options: IOptions = {
      data: newAvatar,
    };
    return this.http.put<TUserResponse>('/profile/avatar', options).then(response => response);
  }

  public async changeUserPassword(passwordData: TChangePasswordRequest) {
    const options: IOptions = {
      data: passwordData,
    };
    return this.http.put('/password', options).then(() => true);
  }

  public async findUsers(searchData: TUserSearchModel) {
    const options: IOptions = {
      data: searchData,
    };
    return this.http.post<TUserResponse[]>('/search', options).then(response => response);
  }
}

const userAPI = new UserAPI();
export default userAPI;
