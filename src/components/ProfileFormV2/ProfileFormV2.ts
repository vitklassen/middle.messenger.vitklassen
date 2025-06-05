import  { ComponentProps } from '../../services/Component';
import template from './template';
import { connect } from '../../utils/utils';
import { Indexed } from '../../services/Store';
import { formElementsDescription } from '../../utils/constantsv2';
import Form from '../../abstract/Form';

class ProfileFormV2 extends Form {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}

function mapUserToProps(state: Indexed) {
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

function mapUserToChangeData(state: Indexed) {
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

export const ProfilePreviewForm = connect(ProfileFormV2, mapUserToProps);
export const ProfileGeneralForm = connect(ProfileFormV2, mapUserToChangeData);