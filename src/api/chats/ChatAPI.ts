import chatAPIInstance from './ChatAPIInstance';
import { IOptions } from '../../services/HTTPTransport';
import type { TGetChatRequest, TGetChatResponse, TDeleteChatRequest,  
  TDeleteChatResponse, TCreateChatRequest, TCreateChatResponse } from '../../models/chats/types';

class ChatAPI {
  public async getChats(chatData?: TGetChatRequest) {
    const options: IOptions = {
      data: chatData,
    };
    return chatAPIInstance.get<TGetChatResponse[]>('', options).then(chats => chats);
  }

  public async createChat(chatParams: TCreateChatRequest) {
    const options: IOptions = {
      data: chatParams,
    };
    return chatAPIInstance.post<TCreateChatResponse>('', options).then(chats => chats);
  }

  public deleteChat(chatId: TDeleteChatRequest) {
    const options: IOptions = {
      data: chatId,
    };
    return chatAPIInstance.delete<TDeleteChatResponse>('', options).then(chats => chats);
  }
  
}

const chatAPI = new ChatAPI();
export default chatAPI;
