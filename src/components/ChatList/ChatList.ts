import chatConnectController from '../../controllers/chats/ChatConnectController';
import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import store, { TStore } from '../../services/Store';
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
            chatConnectController.connectToChat(newChatId, currentUser.id).catch(err => console.log(err));
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
