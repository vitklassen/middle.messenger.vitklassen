import TLoginModel from '../../models/auth/LoginModel';
import authAPI from '../../api/auth/AuthAPI';
import router from '../../services/Router';

class UserLoginController {
  public async login(data: TLoginModel): Promise<void> {
    // добавить валидацию ?
    const isLogin = await authAPI.login(data);
    if (isLogin) {
      router.go('/messenger');
    }
  }

}

const userLoginController = new UserLoginController();
export default userLoginController;
