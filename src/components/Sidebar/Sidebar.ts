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
        if (eventName === 'keyup') {
          const inputElementElement = this.getContent().querySelector('input') as HTMLInputElement;
          inputElementElement.addEventListener(eventName, eventCallback);
        } else {
          this.getContent().addEventListener(eventName, eventCallback);
        }
      });
    }
  }

  override render() {
    return template;
  }

  public changeColor() {
        
  }
}
