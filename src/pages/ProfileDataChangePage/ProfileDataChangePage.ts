import ProfilePageComponent from '../../abstract/ProfilePageComponent';
import { ComponentProps } from '../../services/Component';

export default class ProfileDataChangePage extends ProfilePageComponent {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}