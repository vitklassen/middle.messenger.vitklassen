import userAPI from '../../api/users/UserAPI';
import TChangePasswordRequest from '../../models/users/ChangePasswordRequest';
import router from '../../services/Router';
class UserPasswordController {
  public async changeUserPassword(data: TChangePasswordRequest): Promise<void> {
    // добавить валидацию ?
    await userAPI.changeUserPassword(data);
    router.go('/settings');
  }

}

const userPasswordController = new UserPasswordController();
export default userPasswordController;
