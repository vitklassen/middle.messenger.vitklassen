import Component, { ComponentProps, CallbackTuple } from '../../services/Component';
import template from './template';

export default class ChatHeader extends Component {
  constructor(props: ComponentProps) {
    super({ ...props, 
      events: {
        click: (evt: Event) => {
          if (typeof props.onOpenPopup === 'function') {
            const buttonElement = evt.currentTarget as HTMLButtonElement;
            if (buttonElement.classList.contains('chat-header__control-button_type_add')) {
              props.onOpenPopup('add');
            } else if (buttonElement.classList.contains('chat-header__control-button_type_delete')) {
              props.onOpenPopup('delete');
            } else if (buttonElement.classList.contains('chat-header__control-button_type_delete-chat')) {
              props.onOpenPopup('delete-chat');
            }
          }
        },
      },
    });
  }

  public changeChatName(chatName: string) {
    if (chatName) {
      this.setProps({
        chatName: chatName,
      });
    }
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
