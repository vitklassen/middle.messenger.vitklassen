import Component, { ComponentProps } from '../../services/Component';
import template from './template';

export default class ChatLayout extends Component {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  public openChat() {
    this.setProps({
      isEmptyChat: false,
    });
  }

  override render() {
    return template;
  }
}
