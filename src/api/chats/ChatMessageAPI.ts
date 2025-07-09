import chatMessageAPIInstance from './ChatMessageAPIInstance';
import { TUnreadMessageCount, type TChatConnectResponse } from '../../models/chats/types';

class ChatMessageAPI {
  public async connectToChat(chatId: string) {
    return chatMessageAPIInstance.post<TChatConnectResponse>(`/token/${chatId}`).then(response => response.token);
  }

  public async getOldMessagesCount(chatId: string) {
    return chatMessageAPIInstance.get<TUnreadMessageCount>(`/${chatId}/new`).then(response => response.unread_count);
  }
}

const chatMesssageAPI = new ChatMessageAPI();
export default chatMesssageAPI;
