import { TSignUpRequest } from '../../models/auth/types';
import authAPI from '../../api/auth/AuthAPI';
import router from '../../services/Router';
import { Routes } from '../../utils/constants';

class UserRegisterController {
  public async register(data: TSignUpRequest): Promise<void> {
    // добавить валидацию ?
    await authAPI.createUser(data);
    router.go(Routes.Messenger);
  }
}

const userRegisterController = new UserRegisterController();
export default userRegisterController;
