import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import { TStore } from '../../services/Store';
import { connect } from '../../utils/utils';
import template from './template';

class ChatHeaderComponent extends Component {
  constructor(props: ComponentProps) {
    super({ ...props, 
      events: {
        click: (evt: Event) => {
          if (typeof props.onOpenPopup === 'function') {
            const buttonElement = evt.currentTarget as HTMLButtonElement;
            buttonElement.dataset.function && props.onOpenPopup(buttonElement.dataset.function);
          }
        },
      },
    });
  }
    
  override addEvents(): void {
    const { events = {} } = this._props;
    if (this._element instanceof HTMLElement) { 
      Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
        if (eventName === 'click') {
          const buttonList = this._element?.querySelectorAll('.chat-header__control-button');
          buttonList?.forEach(button => {
            button.addEventListener(eventName, eventCallback);
          });
        } else {
          this._element!.addEventListener(eventName, eventCallback);
        }
      });
    }
  }
  
  override render() {
    return template;
  }
}

function mapChatHeader(state: TStore) {
  if (state.currentChatId) {
    const currentChat = state.chats?.find(item => item.id === state.currentChatId);
    return {
      chatName: currentChat?.title,
      avatarLink: currentChat?.avatar ? currentChat.avatar : '/message-box__avatar-image.png',
    };
  } else {
    return {};
  }
}

export const ChatHeader = connect<typeof ChatHeaderComponent>(ChatHeaderComponent, mapChatHeader);
