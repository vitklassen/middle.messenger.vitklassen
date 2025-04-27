import template from './template';
import Component, {ComponentProps} from '../../services/Component';
export default class SubmitButton extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }
    override render() {
        return template;
    }
}