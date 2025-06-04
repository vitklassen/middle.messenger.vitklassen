import {ProfilePreviewForm} from '../../components/ProfileFormV2/ProfileFormV2';
import userLogoutController from '../../controllers/auth/UserLogoutController';
import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import router from '../../services/Router';
import template from './template';


const profileForm = new ProfilePreviewForm({
  isActiveForm: false,
  isActiveName: true,
});

export default class ProfilePreviewPage extends Component {
  constructor(props: ComponentProps) {
    super({ ...props,
      ProfileForm: profileForm,
      linkPath: '/messenger',
      events: {
        click: (evt: Event) => {
          evt.preventDefault();
          evt.stopPropagation();
          const linkElement = evt.target as HTMLLinkElement;
          router.go(linkElement.dataset.ref);
        },
        submit: (evt: Event) => {
          evt.preventDefault();
          userLogoutController.logout();
        }
      },
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
  
  override render() {
    return template;
  }
}