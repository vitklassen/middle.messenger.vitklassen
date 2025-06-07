import userAPI from '../../api/users/UserAPI';
import TUserPasswordModel from '../../models/users/UserPasswordModel';
import router from '../../services/Router';
class UserPasswordController {
  public async changeUserPassword(data: TUserPasswordModel): Promise<void> {
    // добавить валидацию ?
    await userAPI.changeUserPassword(data);
    router.go('/settings');
  }

}

const userPasswordController = new UserPasswordController();
export default userPasswordController;
