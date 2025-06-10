import { ComponentProps } from '../../services/Component';
import template from './template';
import { connect } from '../../utils/utils';
import { TStore } from '../../services/Store';
import { formElementsDescription } from '../../utils/constantsv2';
import Form from '../../abstract/FormComponent';

class ProfileForm extends Form {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}

function mapUserToProps(state: TStore) {
  if (state.currentUser) {
    return {
      profileName: state.currentUser.first_name,
      fieldsets: [
        {
          ...formElementsDescription.email,
          labelText: 'Почта',
          value: state.currentUser.email,
          disabled: true,
        },
        {
          ...formElementsDescription.login,
          labelText: 'Логин',
          value: state.currentUser.login,
          disabled: true,
        },
        {
          ...formElementsDescription.firstName,
          labelText: 'Имя',
          value: state.currentUser.first_name,
          disabled: true,
        },
        {
          ...formElementsDescription.secondName,
          labelText: 'Фамилия',
          value: state.currentUser.second_name,
          disabled: true,
        },
        {
          ...formElementsDescription.displayName,
          value: state.currentUser.first_name,
          disabled: true,
        },
        {
          ...formElementsDescription.phone,
          labelText: 'Телефон',
          value: state.currentUser.phone,
          disabled: true,
        },
      ],
    };
  } else {
    return {};
  }
}

function mapUserToChangeData(state: TStore) {
  if (state.currentUser) {
    return {
      fieldsets: [
        {
          ...formElementsDescription.email,
          labelText: 'Почта',
          value: state.currentUser.email,
          disabled: false,
        },
        {
          ...formElementsDescription.login,
          labelText: 'Логин',
          value: state.currentUser.login,
          disabled: false,
        },
        {
          ...formElementsDescription.firstName,
          labelText: 'Имя',
          value: state.currentUser.first_name,
          disabled: false,
        },
        {
          ...formElementsDescription.secondName,
          labelText: 'Фамилия',
          value: state.currentUser.second_name,
          disabled: false,
        },
        {
          ...formElementsDescription.displayName,
          value: state.currentUser.first_name,
          disabled: false,
        },
        {
          ...formElementsDescription.phone,
          labelText: 'Телефон',
          value: state.currentUser.phone,
          disabled: false,
        },
      ],
    };
  } else {
    return {};
  }
}

function mapUserToChangePassword(state: TStore) {
  if (state.currentUser) {
    return {
      fieldsets: [
        {
          ...formElementsDescription.oldPassword,
          disabled: false,
        },
        {
          ...formElementsDescription.newPassword,
          inputId: 'input__newPassword_1',
          labelText: 'Новый пароль',
          ariaDescribedby: 'newPassword_1-error',
          errorMessage: '',
          disabled: false,
        },
        {
          ...formElementsDescription.newPassword,
          inputId: 'input__newPassword_2',
          labelText: 'Повторите новый пароль',
          ariaDescribedby: 'newPassword_2-error',
          errorMessage: '',
          disabled: false,
        },
      ],
    };
  } else {
    return {};
  }
}

export const ProfilePreviewForm = connect<typeof ProfileForm>(ProfileForm, mapUserToProps);
export const ProfileGeneralForm = connect<typeof ProfileForm>(ProfileForm, mapUserToChangeData);
export const ProfilePasswordForm = connect<typeof ProfileForm>(ProfileForm, mapUserToChangePassword);
