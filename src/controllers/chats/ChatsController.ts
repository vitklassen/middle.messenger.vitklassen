import chatAPI from '../../api/chats/ChatAPI';
import TChatRequest from '../../models/chats/ChatRequest';
import store from '../../services/Store';

class ChatsController {
  public async getChats(params?: TChatRequest): Promise<void> {
    const userChats = await chatAPI.getChats(params);
    store.set('chats', userChats);
  }
}

const chatsController = new ChatsController();
export default chatsController;
