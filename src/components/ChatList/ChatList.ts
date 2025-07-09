import chatConnectController from '../../controllers/chats/ChatConnectController';
import { TNewMessageResponse, TUnreadMessageResponse, TChatMessageInfo, TChatList } from '../../models/chats/types';
import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import store, { TStore } from '../../services/Store';
import { WSTransport } from '../../services/WSTransport';
import { cloneDeep, connect } from '../../utils/utils';
import template from './template';

class ChatListComponent extends Component {
  constructor(props: ComponentProps) {
    super({ ...props,
      events: {
        click: (evt: Event) => {
          const liElement = evt.currentTarget as HTMLLIElement;
          const newChatId = liElement.dataset.id;
          const { currentChatId, currentWS, currentUser } = store.getState();
          if (currentChatId && currentWS) {
            const oldLiElement = this.getContent().querySelector(`[data-id="${currentChatId}"]`);
            oldLiElement?.classList.remove('message-box_type_active');
            currentWS.close();
          }
          if (newChatId && currentUser) {
            const newLiElement = this.getContent().querySelector(`[data-id="${newChatId}"]`);
            newLiElement?.classList.add('message-box_type_active');
            chatConnectController.connectToChat(newChatId)
              .then(token => {
                let messagesList: TUnreadMessageResponse[] = [];
                const queryString = `/${currentUser.id}/${newChatId}/${token}`;
                const newWS = new WSTransport(queryString);
                newWS.connect()
                  .then(() => {
                    newWS.on(WSTransport.EVENTS.MESSAGE, (data) => {
                      if (Array.isArray(data)) {
                        if (data.length === 0) {
                          const convertedMessagesList = this.convertWSMessagesList(messagesList.reverse(), currentUser.id);
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
                        this.getNewMessage(data as TNewMessageResponse, currentUser.id);
                      }
                    });
                    newWS.send({ content: '0', type: 'get old' });
                    store.set('currentChatId', Number(newChatId));
                    store.set('currentWS', newWS);
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          }
        },
      },
    });
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
      newCurrentMessages.forEach(currentMessage => {
        if (currentMessage.date === newMessageTime) {
          currentMessage.messages.push(message);
        }
      });
      store.set('currentMessages', newCurrentMessages);
      return; 
    } else {
      store.set('currentMessages', [{
        date:this.getDate(newMessage.time),
        messages: [message],
      }]);
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

  override addEvents(): void {
    const { events = {} } = this._props;
    Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
      if (eventName === 'click') {
        const liElements = this.getContent().querySelectorAll('li');
        liElements.forEach(li => li.addEventListener(eventName, eventCallback));
      } else {
        this.getContent().addEventListener(eventName, eventCallback);
      }
    });
  }

  override render(): string {
    return template;
  }
}

function mapChats(state: TStore) {
  if (state.chats) {
    return {
      chats: [...state.chats.map(item => {
        return {
          chatId: item.id,
          chatName: item.title,
          time: item.last_message ? item.last_message.time : '',
          avatarLink: item.avatar ? item.avatar : '/message-box__avatar-image.png',
          lastMessage: item.last_message ? item.last_message.content : '',
          unreadMessages: item.unread_count,
        };
      })],
    };
  } else {
    return { chats: [] };
  }
}

export const ChatList = connect<typeof ChatListComponent>(ChatListComponent, mapChats);
