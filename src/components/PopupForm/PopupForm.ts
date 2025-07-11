import { ComponentProps } from '../../services/Component';
import FormComponent from '../../abstract/FormComponent';
import template from './template';

export default class PopupForm extends FormComponent {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}
