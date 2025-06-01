import TRegisterModel from '../../models/auth/RegisterModel';
import RegisterAPI from '../../api/auth/RegisterAPI';
import router from '../../services/Router';

const registerAPI = new RegisterAPI();

class UserRegisterController {
  public async register(data: TRegisterModel) {
    try {
      const userId = await registerAPI.createUser(data);
      router.go('/messenger');
    } catch (error) {
      console.log(error);
    }
  }
}

const userRegisterController = new UserRegisterController();
export default userRegisterController;
