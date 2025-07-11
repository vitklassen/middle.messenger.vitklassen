import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import router from '../../services/Router';
import template from './template';

export default class ErrorPage extends Component {
  constructor(props: ComponentProps) {
    super({ ...props,
      events: {
        click: (evt: Event) => {
          evt.preventDefault();
          const linkElement = evt.target as HTMLLinkElement;
          router.go(linkElement.dataset.ref);
        },
      },
    });
  }

  override addEvents(): void {
    const { events = {} } = this._props;
    Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
      if (eventName === 'click') {
        const linkElement = this.getContent().querySelector('[href^="/"]') as HTMLLinkElement;
        linkElement?.addEventListener(eventName, eventCallback); 
      } else {
        this.getContent().addEventListener(eventName, eventCallback);
      }
    });
  }

  override render() {
    return template;
  }
}
