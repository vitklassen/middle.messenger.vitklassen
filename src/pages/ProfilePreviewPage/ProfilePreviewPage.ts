import ProfilePageComponent from '../../abstract/ProfilePageComponent';
import { ProfilePreviewForm } from '../../components/ProfileFormV2/ProfileFormV2';
import userLogoutController from '../../controllers/auth/UserLogoutController';
import { ComponentProps } from '../../services/Component';
import template from './template';


const profileForm = new ProfilePreviewForm({
  isActiveForm: false,
  isActiveName: true,
});

export default class ProfilePreviewPage extends ProfilePageComponent {
  constructor(props: ComponentProps) {
    super({ ...props,
      ProfileForm: profileForm,
      events: {
        submit: (evt: Event) => {
          evt.preventDefault();
          userLogoutController.logout();
        },
      },
    });
  }

  override render() {
    return template;
  }
}