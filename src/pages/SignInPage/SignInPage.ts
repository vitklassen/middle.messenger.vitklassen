import template from './template';
import Component from '../../services/Component';
import Form from '../../components/Form/Form';
import FormLabel from '../../components/FormLabel/FormLabel';
import { signInFormLabelsInfo } from '../../utils/constants';

const formElement = new Form({
  formTitle: 'Вход',
  labels: [...signInFormLabelsInfo.map(item => 
    new FormLabel({ ...item }),
  )],
  href: '/sign-up',
  linkText: 'Нет аккаунта?',
  buttonText: 'Войти',
  buttonClassName: 'form__submit-button_state_disabled',
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
