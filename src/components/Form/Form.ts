import template from './template';
import { ComponentProps } from '../../services/Component';
import FormComponent from '../../abstract/FormComponent';


export default class Form extends FormComponent {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}
