import { ComponentProps } from '../../services/Component';
import FormComponent from '../../utils/commonClasses';
import template from './template';

export default class MessageForm extends FormComponent {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}
