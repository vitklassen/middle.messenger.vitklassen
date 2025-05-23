import  { ComponentProps } from '../../services/Component';
import template from './template';
import FormComponent from '../../abstract/FormComponent';

export default class ProfileForm extends FormComponent {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    console.log('profileForm is render');
    return template;
  }
}
