import TLoginRequest from '../../models/auth/LoginModel';
import LoginAPI from '../../api/auth/LoginAPI';
import router from '../../services/Router';

const loginAPI = new LoginAPI();

class UserLoginController {
  public async login(data: TLoginRequest) {
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
