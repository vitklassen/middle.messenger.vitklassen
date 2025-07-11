import template from './template';
import Component from '../../services/Component';
import { Routes, signUpFormLabelsInfo } from '../../utils/constants';
import Form from '../../components/Form/Form';
import userRegisterController from '../../controllers/auth/UserRegisterController';
import { TSignUpRequest } from '../../models/auth/types';

const formElement = new Form({
  formTitle: 'Регистрация',
  fieldsets: signUpFormLabelsInfo,
  href: Routes.SignIn,
  linkText: 'Войти',
  buttonText: 'Зарегистрироваться',
  buttonClassName: 'form__submit-button_state_disabled',
  events: {
    submit: (evt: Event) => {
      evt.preventDefault();
      if (!formElement.hasInvalidInput()) {
        const inputList = Array.from(formElement.getContent().querySelectorAll('input'));
        const request: Record<string, string | number> = {};
        inputList.forEach(input => {
          request[input.name] = input.value;
        });
        userRegisterController.register(request as TSignUpRequest).catch(err => console.log(err));
      }
    },
  },
});
export default class SignUpPage extends Component {
  constructor() {
    super({
      Form: formElement,
    });
  }

  override render() {
    return template;
  }
}
