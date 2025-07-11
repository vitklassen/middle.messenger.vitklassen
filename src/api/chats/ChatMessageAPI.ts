import { TUnreadMessageCount, type TChatConnectResponse } from '../../models/chats/types';
import HTTPTransport from '../../services/HTTPTransport';

class ChatMessageAPI {

  private readonly http: HTTPTransport = new HTTPTransport('/chats');

  public async connectToChat(chatId: string) {
    return this.http.post<TChatConnectResponse>(`/token/${chatId}`).then(response => response.token);
  }

  public async getOldMessagesCount(chatId: string) {
    return this.http.get<TUnreadMessageCount>(`/${chatId}/new`).then(response => response.unread_count);
  }
}

const chatMesssageAPI = new ChatMessageAPI();
export default chatMesssageAPI;
