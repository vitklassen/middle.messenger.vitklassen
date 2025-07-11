import chatUserAPI from '../../api/chats/ChatUserAPI';
import { TUserActionRequest } from '../../models/chats/types';
import { TUserResponse } from '../../models/users/types';
import store from '../../services/Store';

class ChatUserRemovalController {
  public async removeUsers(usersList: TUserResponse[]): Promise<void> {
    if (!usersList || usersList.length === 0 || !store.getState().currentChatId) {
      throw new Error('Произошла ошибка при удалении пользователей');
    }
    const requsetBody: TUserActionRequest = {
      users: [...usersList.map(user => user.id)],
      chatId: store.getState().currentChatId as number,
    };
    await chatUserAPI.deleteUsers(requsetBody);
  }
}

const chatUserRemovalController = new ChatUserRemovalController();
export default chatUserRemovalController;
