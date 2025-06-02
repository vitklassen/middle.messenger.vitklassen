import TUserAuthModel from "../../models/auth/UserAuthModel";
import TUserPasswordModel from "../../models/user/UserPasswordModel";
import TUserProfileModel from "../../models/user/UserProfileModel";
import TUserSearchModel from "../../models/user/UserSearchModel";
import { IOptions } from "../../services/HTTPTransport";
import userAPIInstance from "./UserAPIInstance";

class UserAPI {
  public async changeUserData (userData: TUserProfileModel) {
    const options: IOptions = {
        data: userData,
    };
    return userAPIInstance.put<TUserAuthModel>('/profile', options).then(response => response);
  }

  public async changeUserAvatar () {

  }

  public async changeUserPassword (passwordData: TUserPasswordModel) {
    const options: IOptions = {
        data: passwordData,
    };
    return userAPIInstance.put('/password', options).then(() => true);
  }

  public async findUser (searchData: TUserSearchModel) {
    const options: IOptions = {
        data: searchData,
    };
    return userAPIInstance.post<TUserAuthModel>('/search', options).then(response => response);
  }
}

const userAPI = new UserAPI();
export default userAPI;
