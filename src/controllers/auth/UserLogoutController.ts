import LogoutAPI from '../../api/auth/LogoutAPI';
import router from '../../services/Router';
import store from '../../services/Store';

const logoutAPI = new LogoutAPI();

class UserLogoutController {
  public async logout() {
    try {
      const isLogout = await logoutAPI.logoutUser();
      if (isLogout) {
        store.set('currentUser', null);
        router.go('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const userLogoutController = new UserLogoutController();
export default userLogoutController;
