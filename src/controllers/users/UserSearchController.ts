import userAPI from '../../api/users/UserAPI';
import { TUserResponse, TUserSearchModel } from '../../models/users/types';

class UserSearchController {
  public async findUsers(data: TUserSearchModel): Promise<TUserResponse[]> {
    // добавить валидацию ?
    const users = await userAPI.findUsers(data);
    return users;
  }
}

const userSearchController = new UserSearchController();
export default userSearchController;
