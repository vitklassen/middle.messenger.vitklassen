import chatAPI from '../../api/chats/ChatAPI';
import { TCreateChatRequest } from '../../models/chats/types';

class ChatCreatingController {
  public async createChat(title: TCreateChatRequest): Promise<void> {
    await chatAPI.createChat(title);
  }
}

const chatCreatingController = new ChatCreatingController();
export default chatCreatingController;
