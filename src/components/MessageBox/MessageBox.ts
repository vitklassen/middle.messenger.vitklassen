import Component, { ComponentProps } from '../../services/Component';
import template from './template';

export default class MessageBox extends Component {
  constructor(props: ComponentProps) {
    super({ ...props, 
      events: {
        click: (evt: Event) => {
          const liElement = evt.currentTarget as HTMLLIElement;
          if (typeof props.onFocusMessage === 'function') {
            props.onFocusMessage(liElement.dataset.id ? liElement.dataset.id : '');
          }
          if (typeof props.onChangeName === 'function') {
            const chatName = this._getChatname();
            props.onChangeName(chatName ? chatName : '');
          }
        },
      },
    });
  }

  private _getChatname() {
    const { chatName } = this._props;
    if (typeof chatName === 'string') {
      return chatName;
    }
    return undefined;
  }

  override render() {
    return template;
  }
}