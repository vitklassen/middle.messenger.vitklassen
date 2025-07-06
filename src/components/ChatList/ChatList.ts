import chatConnectController from '../../controllers/chats/ChatConnectController';
import chatGettingOldMessagesController from '../../controllers/chats/ChatGettingOldMessagesController';
import { TUnreadMessagesList } from '../../models/chats/types';
import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import store, { TStore } from '../../services/Store';
import { WSTransport } from '../../services/WSTransport';
import { connect } from '../../utils/utils';
import template from './template';

class ChatListComponent extends Component {
  constructor(props: ComponentProps) {
    super({ ...props,
      events: {
        click: async (evt: Event) => {
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
            const token = await chatConnectController.connectToChat(newChatId);
            const oldMessagesCount = await chatGettingOldMessagesController.getOldMessages(newChatId);
            const oldMessagesList: TUnreadMessagesList[] = [];
            const queryString = `/${currentUser.id}/${newChatId}/${token}`;
            const newWS = new WSTransport(queryString);
            newWS.connect()
            .then(() => {
              newWS.on(WSTransport.EVENTS.MESSAGE, (data) => {
                if(Array.isArray(data)) {
                  if(data.length === 0) {
                    store.set('currentMessages', oldMessagesList);
                    return;
                  }
                  else {
                    oldMessagesList.push(data);
                    newWS.send({content: '0', type: 'get old'});
                  }
                }
              });
              newWS.send({content: '0', type: 'get old'});
            });
            store.set('currentChatId', Number(newChatId));
            store.set('currentWS', newWS);
          }
        },
      },
    });
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
      messages: [...state.chats.map(item => {
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
    return { messages: [] };
  }
}

export const ChatList = connect<typeof ChatListComponent>(ChatListComponent, mapChats);
