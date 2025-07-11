import chatUserAPI from '../../api/chats/ChatUserAPI';
import { TUserActionRequest } from '../../models/chats/types';
import { TUserResponse } from '../../models/users/types';
import store from '../../services/Store';

class ChatUserGettingController {
  public async addUsers(usersList: TUserResponse[]): Promise<void> {
    console.log(usersList);
    console.log(store.getState().currentChatId);
    if (usersList.length === 0) {
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
