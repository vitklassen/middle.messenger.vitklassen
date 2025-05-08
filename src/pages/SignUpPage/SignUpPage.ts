import template from './template';
import Component from '../../services/Component';
import Form from '../../components/Form/Form';
import FormLabel from '../../components/FormLabel/FormLabel';
import { signUpFormLabelsInfo } from '../../utils/constants';

const formElement = new Form({
  formTitle: 'Регистрация',
  labels: [...signUpFormLabelsInfo.map(item => 
    new FormLabel({ ...item }),
  )],
  href: 'signin',
  linkText: 'Войти',
  buttonText: 'Зарегистрироваться',
  buttonClassName: 'form__submit-button_state_disabled',
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
