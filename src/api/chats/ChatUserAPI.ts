import { TUserActionRequest } from '../../models/chats/types';
import HTTPTransport, { IOptions } from '../../services/HTTPTransport';

class ChatUserAPI {

  private readonly http: HTTPTransport = new HTTPTransport('/chats/users');

  public async addUser(users: TUserActionRequest) {
    const options: IOptions = {
      data: users,
    };
    return this.http.put('', options);
  }

  public async deleteUsers(users: TUserActionRequest) {
    const options: IOptions = {
      data: users,
    };
    return this.http.delete('', options);
  }
  
}

const chatUserAPI = new ChatUserAPI();
export default chatUserAPI;
