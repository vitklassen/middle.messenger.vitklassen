import userAPI from '../../api/users/UserAPI';
import TUserRequset from '../../models/users/UserRequest';
import router from '../../services/Router';
import store from '../../services/Store';

class UserProfileController {
  public async changeUserData(data: TUserRequset): Promise<void> {
    // добавить валидацию ?
    const newUserData = await userAPI.changeUserData(data);
    store.set('currentUser', newUserData);
    router.go('/settings');
  }
}

const userProfileController = new UserProfileController();
export default userProfileController;
