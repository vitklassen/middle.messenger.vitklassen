import chatMesssageAPI from '../../api/chats/ChatMessageAPI';
import { TChatList, TChatMessageInfo, TNewMessageResponse, TUnreadMessageResponse } from '../../models/chats/types';
import store from '../../services/Store';
import { WSTransport } from '../../services/WSTransport';
import { cloneDeep } from '../../utils/utils';

class ChatConnectController {
  public async connectToChat(chatId: string, currentUserId: number) {
    try {
      const token = await chatMesssageAPI.connectToChat(chatId);
      let messagesList: TUnreadMessageResponse[] = [];
      const queryString = `/${currentUserId}/${chatId}/${token}`;
      const newWS = new WSTransport(queryString);
      await newWS.connect();
      newWS.on(WSTransport.EVENTS.MESSAGE, (data) => {
        if (Array.isArray(data)) {
          if (data.length === 0) {
            const convertedMessagesList = this.convertWSMessagesList(messagesList.reverse(), currentUserId);
            store.set('currentMessages', convertedMessagesList);
            return;
          }
          messagesList = messagesList.concat(data);
          const lastMessage = messagesList[messagesList.length - 1];
          newWS.send({ content: String(lastMessage.id), type: 'get old' });
        }
      });
      newWS.on(WSTransport.EVENTS.MESSAGE, (data) => {
        if (!Array.isArray(data)) {
          this.getNewMessage(data as TNewMessageResponse, currentUserId);
        }
      });
      newWS.send({ content: '0', type: 'get old' });
      store.set('currentChatId', Number(chatId));
      store.set('currentWS', newWS);
    } catch (err) {
      throw new Error('Ошибка при подключении к чату');
    }
  }

  private convertWSMessagesList(messagesList: TUnreadMessageResponse[], currentUserId: number): TChatList[] {
    const timeSet = new Set([...messagesList.map(message => this.getDate(message.time))]);
    const transformedMessagesList: TChatList[] = [];
    timeSet.forEach(time => {
      const currentMessages = messagesList.filter(message => this.getDate(message.time) === time);
      const transformedCurrentMessages = {
        date: time,
        messages: [...currentMessages.map(currentMessage => {
          const message: TChatMessageInfo = {
            content: currentMessage.content,
            time: this.getTime(currentMessage.time),
          };
          if (currentMessage.user_id === currentUserId) {
            message.isCurrentUser = true;
          }
          return message;
        })],
      };
      transformedMessagesList.push(transformedCurrentMessages);
    });
    return transformedMessagesList;
  }

  private getNewMessage(newMessage: TNewMessageResponse, currentUserId: number): void {
    const message: TChatMessageInfo = {
      content: newMessage.content,
      time: this.getTime(newMessage.time),
    };
    if (newMessage.user_id === currentUserId) {
      message.isCurrentUser = true;
    }
    const { currentMessages } = store.getState();
    if (currentMessages && currentMessages.length > 0) {
      const newMessageTime = this.getDate(newMessage.time);
      const newCurrentMessages = cloneDeep(currentMessages) as TChatList[];
      const currentMessageDateList = newCurrentMessages.find(currentMessage => currentMessage.date === newMessageTime);
      if (currentMessageDateList) {
        currentMessageDateList.messages.push(message);
      } else {
        newCurrentMessages.push({
          date:this.getDate(newMessage.time),
          messages: [message],
        });
      }
      store.set('currentMessages', newCurrentMessages);
      return; 
    } else {
      store.set('currentMessages', [{
        date:this.getDate(newMessage.time),
        messages: [message],
      }]);
    }
  }

  private getDate(date: string): string {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getUTCMonth() + 1;
    const day = new Date(date).getUTCDate();
    return `${year}-${month}-${day}`;
  }

  private getTime(date: string): string {
    const hours = new Date(date).getUTCHours();
    const minutes = new Date(date).getUTCMinutes();
    return `${hours}:${minutes}`;
  }

}

const chatConnectController = new ChatConnectController();
export default chatConnectController;
