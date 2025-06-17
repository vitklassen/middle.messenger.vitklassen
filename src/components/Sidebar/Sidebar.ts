import Component, { ComponentProps, CallbackTuple } from '../../services/Component';
import template from './template';

export default class Sidebar extends Component {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override addEvents() {
    const { events = {} } = this._props;
    if (this._element instanceof HTMLElement) { 
      Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
        if (eventName === 'input') {
          const inputElementElement = this.getContent().querySelector('input') as HTMLInputElement;
          inputElementElement.addEventListener(eventName, eventCallback);
        } else if (eventName === 'click') {
          const linkElement = this.getContent().querySelector('[href^="/"]') as HTMLLinkElement;
          linkElement?.addEventListener(eventName, eventCallback);
        } else if (eventName === 'addChat') {
          const buttonElement = this.getContent().querySelector('button') as HTMLButtonElement;
          buttonElement.addEventListener('click', eventCallback);
        } else {
          this.getContent().addEventListener(eventName, eventCallback);
        }
      });
    }
  }

  override render() {
    return template;
  }
}
