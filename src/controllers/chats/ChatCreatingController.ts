import chatAPI from '../../api/chats/ChatAPI';
import NewChatRequest from '../../models/chats/NewChatRequest';

class ChatCreatingController {
  public async createChat(title: NewChatRequest): Promise<void>{
    await chatAPI.createChat(title);
  }
}

const chatCreatingController = new ChatCreatingController();
export default chatCreatingController;
