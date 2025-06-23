import chatUserAPI from '../../api/chats/ChatUserAPI';
import { TUserActionRequest } from '../../models/chats/types';
import { TUserResponse } from '../../models/users/types';
import store from '../../services/Store';

class ChatUserGettingController {
  public async addUsers(usersList: TUserResponse[]): Promise<void> {
    if (!usersList || usersList.length === 0 || !store.getState().currentChatId) {
      throw new Error('Произошла ошибка при добавлении пользователей');
    }
    const requsetBody: TUserActionRequest = {
      users: [...usersList.map(user => user.id)],
      chatId: store.getState().currentChatId as number,
    };
    await chatUserAPI.addUser(requsetBody);
  }
}

const chatUserGettingController = new ChatUserGettingController();
export default chatUserGettingController;
