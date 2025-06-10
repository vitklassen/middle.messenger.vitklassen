import chatAPIInstance from './ChatAPIInstance';
import { IOptions } from '../../services/HTTPTransport';
import TChatRequest from '../../models/chats/ChatRequest';
import TChatResponse from '../../models/chats/ChatResponse';
import TNewChatRequest from '../../models/chats/NewChatRequest';
import TNewChatResponse from '../../models/chats/NewChatResponse';
import TDeleteChatRequest from '../../models/chats/DeleteChatRequest';
import TDeleteChatResponse from '../../models/chats/DeleteChatResponse';

class ChatAPI {
  public async getChats(chatData?: TChatRequest) {
    const options: IOptions = {
      data: chatData,
    };
    return chatAPIInstance.get<TChatResponse[]>('', options).then(chats => chats);
  }

  public async createChat(chatParams: TNewChatRequest) {
    const options: IOptions = {
      data: chatParams,
    };
    return chatAPIInstance.post<TNewChatResponse>('', options).then(chats => chats);
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
