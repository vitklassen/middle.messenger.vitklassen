import { TUserActionRequest } from '../../models/chats/types';
import { IOptions } from '../../services/HTTPTransport';
import chatUserAPIInstance from './ChatUserAPIInstance';

class ChatUserAPI {
  public async addUser(users: TUserActionRequest) {
    const options: IOptions = {
      data: users,
    };
    return chatUserAPIInstance.put('', options);
  }

  public async deleteUsers(users: TUserActionRequest) {
    const options: IOptions = {
      data: users,
    };
    return chatUserAPIInstance.delete('', options);
  }
  
}

const chatUserAPI = new ChatUserAPI();
export default chatUserAPI;
