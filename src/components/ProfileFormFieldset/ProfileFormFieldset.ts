import Component, { ComponentProps } from '../../services/Component';
import template from './template';

export default class ProfileFormFieldset extends Component {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    console.log('profileFormFieldset is render');
    return template;
  }
}