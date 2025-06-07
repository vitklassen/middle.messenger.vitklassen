import ProfilePageComponent from '../../abstract/ProfilePageComponent';
import { ProfilePasswordForm } from '../../components/ProfileForm/ProfileForm';
import userPasswordController from '../../controllers/users/UserPasswordController';
import TUserPasswordModel from '../../models/users/UserPasswordModel';
import { ComponentProps } from '../../services/Component';
import template from './template';

const profileForm = new ProfilePasswordForm({
  isActiveForm: true,
  buttonText: 'Сохранить',
  buttonClassName: 'profile-form__submit-button_type_change-password',
  events: {
    submit: (evt: Event) => {
      evt.preventDefault();
      if(!profileForm.hasInvalidInput()) {
        const inputList = Array.from(profileForm.getContent().querySelectorAll('input'))
        const request: Record<string, string> = {};
        inputList.forEach(input => {
          request[input.name] = input.value;
        });
        userPasswordController.changeUserPassword(request as TUserPasswordModel)
        .catch(err => console.log(err));
      }
    },
  }
})


export default class ProfilePasswordPage extends ProfilePageComponent {
  constructor(props: ComponentProps) {
    super({ ...props,
      ProfileForm: profileForm,
     });
  }

  override render() {
    return template;
  }
}
