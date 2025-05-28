import router from '../../services/Router';
import UserAPI from '../../api/auth/GetUserAPI';

const userAPI = new UserAPI();

class UserDataController {
  public async getUserData() {
    try {
      const userData = await userAPI.request();
      return userData;
    } catch (error) {
        router.go('/');
    }
  }
}

const userDataController = new UserDataController();
export default userDataController;
