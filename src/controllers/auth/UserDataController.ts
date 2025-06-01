import authAPI from '../../api/auth/AuthAPI';
import store from '../../services/Store';

class UserDataController {
  public async checkAuth(): Promise<boolean> {
    if (store.getState().currentUser) {
      return true;
    } 
    const userData = await authAPI.getUserData();
    store.set('currentUser', userData);
    return true;
  }
}

const userDataController = new UserDataController();
export default userDataController;
