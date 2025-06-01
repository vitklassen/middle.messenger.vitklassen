import Component, { ComponentProps, CallbackTuple } from '../../services/Component';
import template from './template';

export default class ProfileFooter extends Component {
  constructor(props: ComponentProps) {
    super({ ...props});
  }

  override addEvents(): void {
    const { events = {} } = this._props;
    Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
      if (eventName === 'click') {
        const buttonList = this.getContent().querySelectorAll(`button[type="button"]`);
        buttonList?.forEach(button => {
          button.addEventListener(eventName, eventCallback);
        });
      }
      else {
        this.getContent().addEventListener(eventName, eventCallback);
      }
    });
  }

  override render() {
    return template;
  }
}
