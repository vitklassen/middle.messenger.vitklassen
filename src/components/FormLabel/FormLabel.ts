import template from "./template";
import Component, {ComponentProps} from "../../services/Component";
export default class FormLabel extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }
    override render () {
        return template;
    }
}