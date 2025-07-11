import userAPI from '../../api/users/UserAPI';
import store from '../../services/Store';

class UserAvatarController {
  public async changeUserAvatar(data: FormData): Promise<void> {
    // добавить валидацию ?
    const newUserData = await userAPI.changeUserAvatar(data);
    store.set('currentUser', newUserData);
  }
}

const userAvatarController = new UserAvatarController();
export default userAvatarController;
