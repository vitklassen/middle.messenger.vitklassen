import chatMesssageAPI from '../../api/chats/ChatMessageAPI';

class ChatGettingOldMessagesController {
  public async getOldMessages(chatId: string) {
    try {
      const unreadCount = await chatMesssageAPI.getOldMessagesCount(chatId);
      return unreadCount;
    } catch (err) {
      console.log(err);
    }
  }
}

const chatGettingOldMessagesController = new ChatGettingOldMessagesController();
export default chatGettingOldMessagesController;
