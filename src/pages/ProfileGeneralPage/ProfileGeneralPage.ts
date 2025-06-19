import ProfilePageComponent from '../../abstract/ProfilePageComponent';
import Popup from '../../components/Popup/Popup';
import PopupForm from '../../components/PopupForm/PopupForm';
import { ProfileGeneralForm } from '../../components/ProfileForm/ProfileForm';
import { ProfileHeaderComponent } from '../../components/ProfileHeader/ProfileHeader';
import userAvatarController from '../../controllers/users/UserAvatarController';
import userProfileController from '../../controllers/users/UserProfileController';
import { TUserRequset } from '../../models/users/types';
import { ComponentProps } from '../../services/Component';
import template from './template';

const profileForm = new ProfileGeneralForm({
  isActiveForm: true,
  buttonText: 'Сохранить',
  buttonClassName: 'profile-form__submit-button_type_change-data',
  events: {
    submit: (evt: Event) => {
      evt.preventDefault();
      if (!profileForm.hasInvalidInput()) {
        const inputList = Array.from(profileForm.getContent().querySelectorAll('input'));
        const request: Record<string, string> = {};
        inputList.forEach(input => {
          request[input.name] = input.value;
        });
        userProfileController.changeUserData(request as TUserRequset)
          .catch(err => console.log(err));
      }
    },
  },
});

const avatarForm = new PopupForm({
  buttonText: 'Поменять',
  events: {
    submit: (evt: Event) => {
      evt.preventDefault();
      const form = new FormData(avatarForm.getContent() as HTMLFormElement);
      userAvatarController.changeUserAvatar(form)
        .then(() => avatarPopup.close())
        .catch(err => console.log(err));
    },
  },
});

const avatarPopup = new Popup({
  Form: avatarForm,
  popupTitle: 'Загрузить файл',
});

const profileHeader = new ProfileHeaderComponent({
  headerClassname: 'profile-header__user-name_type_change',
  AvatarPopup: avatarPopup,
  events: {
    click: () => {
      avatarPopup.open();
    },
  },
});

export default class ProfileGeneralPage extends ProfilePageComponent {
  constructor(props: ComponentProps) {
    super({ ...props,
      ProfileHeader: profileHeader,
      ProfileForm: profileForm,
    });
  }

  override render() {
    return template;
  }
}
