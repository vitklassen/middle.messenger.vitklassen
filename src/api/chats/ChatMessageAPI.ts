import chatMessageAPIInstance from './ChatMessageAPIInstance';
import type { TChatConnectResponse } from '../../models/chats/types';

class ChatMessageAPI {
  public async connectToChat(chatId: string) {
    return chatMessageAPIInstance.post<TChatConnectResponse>(`/token/${chatId}`).then(response => response.token);
  }
}

const chatMesssageAPI = new ChatMessageAPI();
export default chatMesssageAPI;
