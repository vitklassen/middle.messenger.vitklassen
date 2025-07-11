import Component, { CallbackTuple, ComponentProps } from '../../services/Component';
import { TStore } from '../../services/Store';
import ENV from '../../utils/env';
import { connect } from '../../utils/utils';
import template from './template';

class ProfileHeader extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
    });
  }

  override addEvents(): void {
    const { events = {} } = this._props;
    Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
      if (eventName === 'click') {
        const buttonElement = this.getContent().querySelector('.profile-header__avatar') as HTMLButtonElement;
        buttonElement?.addEventListener(eventName, eventCallback); 
      } else {
        this.getContent().addEventListener(eventName, eventCallback);
      }
    });
  }

  override addAttributes(): void {
    const { attr = {} } = this._props;
    Object.entries(attr).forEach(([attrName, attrValue]: [string, string]) => {
      if (this._element) {
        if (attrName === 'backgroundImage') {
          if (attrValue) {
            const avatarButton = this._element.querySelector('button') as HTMLButtonElement;
            avatarButton.style.backgroundImage = "url('" + ENV.RESOURCES + attrValue + "')";
          }
        } else {
          this._element.setAttribute(attrName, attrValue);
        }
      }
    });
  }

  override render(): string {
    return template;
  }
}

function mapUserToChangeAvatar(state: TStore) {
  if (state.currentUser) {
    return {
      userName: state.currentUser.first_name,
      attr: {
        backgroundImage: state.currentUser.avatar,
      },
    };
  } else {
    return {};
  }
}
export const ProfileHeaderComponent = connect<typeof ProfileHeader>(ProfileHeader, mapUserToChangeAvatar);
