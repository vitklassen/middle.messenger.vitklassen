import HTTPTransport, { IOptions } from '../../services/HTTPTransport';
import type { TGetChatRequest, TGetChatResponse, TDeleteChatRequest,  
  TDeleteChatResponse, TCreateChatRequest, TCreateChatResponse } from '../../models/chats/types';

class ChatAPI {

  private readonly http: HTTPTransport = new HTTPTransport('/chats');

  public async getChats(chatData?: TGetChatRequest) {
    const options: IOptions = {
      data: chatData,
    };
    return this.http.get<TGetChatResponse[]>('', options).then(chats => chats);
  }

  public async createChat(chatParams: TCreateChatRequest) {
    const options: IOptions = {
      data: chatParams,
    };
    return this.http.post<TCreateChatResponse>('', options).then(chats => chats);
  }

  public deleteChat(chatId: TDeleteChatRequest) {
    const options: IOptions = {
      data: chatId,
    };
    return this.http.delete<TDeleteChatResponse>('', options).then(chats => chats);
  }
  
}

const chatAPI = new ChatAPI();
export default chatAPI;
