import { TAddNewUserRequest } from "../../models/chats/types";
import { IOptions } from "../../services/HTTPTransport";
import chatUserAPIInstance from "./ChatUserAPIInstance";

class ChatUserAPI {
  public async addUser(newUser: TAddNewUserRequest) {
    const options: IOptions = {
      data: newUser,
    };
    return chatUserAPIInstance.put('', options);
  }

  public async deleteUser() {
    
  }
  
}

const chatUserAPI = new ChatUserAPI();
export default chatUserAPI;
