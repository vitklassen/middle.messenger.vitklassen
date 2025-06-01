import TRegisterModel from '../../models/auth/RegisterModel';
import authAPI from '../../api/auth/AuthAPI';
import router from '../../services/Router';

class UserRegisterController {
  public async register(data: TRegisterModel): Promise<void> {
    // добавить валидацию ?
    await authAPI.createUser(data);
    router.go('/messenger');
  }
}

const userRegisterController = new UserRegisterController();
export default userRegisterController;
