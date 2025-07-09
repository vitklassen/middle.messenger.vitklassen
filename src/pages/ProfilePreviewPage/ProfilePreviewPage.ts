import ProfilePageComponent from '../../abstract/ProfilePageComponent';
import { ProfilePreviewForm } from '../../components/ProfileForm/ProfileForm';
import { ProfileHeaderComponent } from '../../components/ProfileHeader/ProfileHeader';
import userLogoutController from '../../controllers/auth/UserLogoutController';
import { ComponentProps } from '../../services/Component';
import template from './template';

const profileForm = new ProfilePreviewForm({
  isActiveForm: false,
  isActiveName: true,
});

const profileHeader = new ProfileHeaderComponent({});

export default class ProfilePreviewPage extends ProfilePageComponent {
  constructor(props: ComponentProps) {
    super({ ...props,
      ProfileHeader: profileHeader,
      ProfileForm: profileForm,
      events: {
        submit: (evt: Event) => {
          evt.preventDefault();
          userLogoutController.logout().catch(err => console.log(err));
        },
      },
    });
  }

  override render() {
    return template;
  }
}
