import TLoginModel from '../../models/auth/LoginModel';
import LoginAPI from '../../api/auth/LoginAPI';
import router from '../../services/Router';

const loginAPI = new LoginAPI();

class UserLoginController {
  public async login(data: TLoginModel) {
    try {
      const isLogin = await loginAPI.create(data);
      if (isLogin) {
        router.go('/messenger');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const userLoginController = new UserLoginController();
export default userLoginController;
