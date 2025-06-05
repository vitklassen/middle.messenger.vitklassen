import ProfilePageComponent from '../../abstract/ProfilePageComponent';
import { ProfileGeneralForm } from '../../components/ProfileFormV2/ProfileFormV2';
import { ComponentProps } from '../../services/Component';
import template from './template';

const onSubmit = (evt: Event) => {
  evt.preventDefault();
  if(profileForm.hasInvalidInput()) {
    
  }
}

const profileForm = new ProfileGeneralForm({
  isActiveForm: true,
  buttonText: 'Сохранить',
  buttonClassName: 'profile-form__submit-button_type_change-data',
  events: {
    submit: onSubmit,
  }
})


export default class ProfileGeneralPage extends ProfilePageComponent {
  constructor(props: ComponentProps) {
    super({ ...props,
      ProfileForm: profileForm,
     });
  }

  override render() {
    return template;
  }
}