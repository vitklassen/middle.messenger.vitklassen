import chatAPI from '../../api/chats/ChatAPI';
import TDeleteChatRequest from '../../models/chats/DeleteChatRequest';

class ChatRemovalController {
  public async deleteChat(params: TDeleteChatRequest): Promise<void> {
    await chatAPI.deleteChat(params);
    
  }
}

const chatRemovalontroller = new ChatRemovalController();
export default chatRemovalontroller;
