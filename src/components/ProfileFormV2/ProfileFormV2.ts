import  { ComponentProps } from '../../services/Component';
import template from './template';
import FormComponent from '../../abstract/FormComponent';
import { connect } from '../../utils/utils';
import { Indexed } from '../../services/Store';
import { formElementsDescription } from '../../utils/constantsv2';

class ProfileFormV2 extends FormComponent {
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
          disabled: true
        },
        {
          ...formElementsDescription.login,
          labelText: 'Логин',
          value: state.currentUser.login,
          disabled: true
        },
        {
          ...formElementsDescription.firstName,
          labelText: 'Имя',
          value: state.currentUser.first_name,
          disabled: true
        },
        {
          ...formElementsDescription.secondName,
          labelText: 'Фамилия',
          value: state.currentUser.second_name,
          disabled: true
        },
        {
          ...formElementsDescription.displayName,
          value: state.currentUser.first_name,
          disabled: true
        },
        {
          ...formElementsDescription.phone,
          labelText: 'Телефон',
          value: state.currentUser.phone,
          disabled: true
        },
      ],
    };
  } else {
    return {};
  }
}

export const ProfilePreviewForm = connect(ProfileFormV2, mapUserToProps);
//export default connect(ProfileFormV2, mapUserToProps);