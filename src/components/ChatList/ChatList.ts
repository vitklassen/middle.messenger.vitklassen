import chatConnectController from '../../controllers/chats/ChatConnectController';
import { TNewMessageResponse, TUnreadMessageResponse, TChatMessageInfo } from '../../models/chats/types';
import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import store, { TStore } from '../../services/Store';
import { WSTransport } from '../../services/WSTransport';
import { connect } from '../../utils/utils';
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
                let messagesList: TChatMessageInfo[] = [];
                const queryString = `/${currentUser.id}/${newChatId}/${token}`;
                const newWS = new WSTransport(queryString);
                newWS.connect()
                  .then(() => {
                    newWS.on(WSTransport.EVENTS.MESSAGE, (data) => {
                      if (Array.isArray(data)) {
                        if (data.length === 0) {
                          store.set('currentMessages', messagesList.reverse());
                          return;
                        }
                        const messagesInfo = data.map(message => this.getMessageInfo(message as TUnreadMessageResponse, currentUser.id));
                        messagesList = messagesList.concat(messagesInfo);
                        const lastMessage = messagesInfo[messagesInfo.length - 1];
                        newWS.send({ content: String(lastMessage.id), type: 'get old' });
                      }
                    });
                    newWS.on(WSTransport.EVENTS.MESSAGE, (data) => {
                      if (!Array.isArray(data)) {
                        const { currentMessages } = store.getState();
                        const newMessage = this.getMessageInfo(data as TNewMessageResponse, currentUser.id);
                        store.set('currentMessages', currentMessages ? [...currentMessages, newMessage] : [newMessage]);
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

  private getMessageInfo(message: TNewMessageResponse | TUnreadMessageResponse, currentUserId: number): TChatMessageInfo {
    const { id, time, user_id, content } = message;
    const chatMessage: TChatMessageInfo = {
      id: id,
      time: time,
      content: content,
    };
    if (user_id === currentUserId) {
      chatMessage.isCurrentUser = true;
    }
    return chatMessage;
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
