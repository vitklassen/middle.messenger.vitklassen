import template from './template';
import Component from '../../services/Component';
import { signInFormLabelsInfo } from '../../utils/constants';
import FormV2 from '../../components/Form/Form';
import userLoginController from '../../controllers/auth/UserLoginController';
import { TSignInRequest } from '../../models/auth/types';

const formElement = new FormV2({
  formTitle: 'Вход',
  fieldsets: signInFormLabelsInfo,
  href: '/sign-up',
  linkText: 'Нет аккаунта?',
  buttonText: 'Войти',
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
        userLoginController.login(request as TSignInRequest).catch(err => console.log(err));
      }
    },
  },
});
export default class SignInPage extends Component {
  constructor() {
    super({
      Form: formElement,
    });
  }

  override render() {
    return template;
  }
}
