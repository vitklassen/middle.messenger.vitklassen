import chatMesssageAPI from '../../api/chats/ChatMessageAPI';

class ChatConnectController {
  public async connectToChat(chatId: string) {
    try {
      const token = await chatMesssageAPI.connectToChat(chatId);
      return token;
    } catch (err) {
      throw new Error('Ошибка при подключении к чату');
    }
  }
}

const chatConnectController = new ChatConnectController();
export default chatConnectController;
