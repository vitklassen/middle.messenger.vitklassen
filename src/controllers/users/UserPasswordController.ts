import userAPI from '../../api/users/UserAPI';
import { TChangePasswordRequest } from '../../models/users/types';
import router from '../../services/Router';
import { Routes } from '../../utils/constants';
class UserPasswordController {
  public async changeUserPassword(data: TChangePasswordRequest): Promise<void> {
    // добавить валидацию ?
    await userAPI.changeUserPassword(data);
    router.go(Routes.Settings);
  }

}

const userPasswordController = new UserPasswordController();
export default userPasswordController;
