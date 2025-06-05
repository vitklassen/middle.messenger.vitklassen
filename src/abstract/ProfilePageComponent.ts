import Component, { CallbackTuple, ComponentProps } from '../services/Component';
import router from '../services/Router';

export default class ProfilePageComponent extends Component {
  constructor(props: ComponentProps) {
    super({ ...props,
      events: Object.assign(props.events ? props.events : {}, {
        click: (evt: Event) => {
          evt.preventDefault();
          const linkElement = evt.target as HTMLLinkElement;
          router.go(linkElement.dataset.ref);
        },
      }),
    });
  }

  override addEvents(): void {
    const { events = {} } = this._props;
    Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
      if (eventName === 'click') {
        const linkElements = this.getContent().querySelectorAll('[href^="/"]');
        linkElements.forEach(link => {
          link.addEventListener(eventName, eventCallback);
        });
      } else {
        this.getContent().addEventListener(eventName, eventCallback);
      }
    });
  }
}
