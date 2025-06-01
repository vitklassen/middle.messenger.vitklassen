import authAPI from '../../api/auth/AuthAPI';
import router from '../../services/Router';
import store from '../../services/Store';

class UserLogoutController {
  public async logout(): Promise<void> {
    try {
      const isLogout = await authAPI.logoutUser();
      if (isLogout) {
        store.set('currentUser', null);
        router.go('/');
      }
    } catch (error) {
      router.go('/server-error');
    }
  }
}

const userLogoutController = new UserLogoutController();
export default userLogoutController;
