import chatAPI from '../../api/chats/ChatAPI';
import TChatRequest from '../../models/chats/ChatRequest';
import NewChatRequest from '../../models/chats/NewChatRequest';
import store from '../../services/Store';

class ChatsController {
  public async getChats(params?: TChatRequest): Promise<void> {
    const userChats = await chatAPI.getChats(params);
    store.set('chats', userChats);
  }
  public async createChat(title: NewChatRequest): Promise<void>{
    await chatAPI.createChat(title);
    await this.getChats();
  }
}

const chatsController = new ChatsController();
export default chatsController;
