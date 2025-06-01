import router from '../../services/Router';
import UserAPI from '../../api/auth/GetUserAPI';
import store from '../../services/Store';

const userAPI = new UserAPI();

class UserDataController {
  public async getUserData() {
    try {
      const userData = await userAPI.request();
      store.set('currentUser', userData);
    } catch (error) {
      router.go('/');
    }
  }
}

const userDataController = new UserDataController();
export default userDataController;
