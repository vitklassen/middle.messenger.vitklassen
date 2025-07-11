import authAPI from '../../api/auth/AuthAPI';
import router from '../../services/Router';
import store from '../../services/Store';
import { Routes } from '../../utils/constants';

class UserLogoutController {
  public async logout(): Promise<void> {
    try {
      const isLogout = await authAPI.logoutUser();
      if (isLogout) {
        store.set('currentUser', null);
        store.set('chats', null);
        store.set('currentChatId', null);
        store.set('currentWS', null);
        store.set('currentMessages', null);
        router.go(Routes.SignIn);
      }
    } catch (error) {
      router.go(Routes.Error500);
    }
  }
}

const userLogoutController = new UserLogoutController();
export default userLogoutController;
