import Component, { ComponentProps } from "../../services/Component"
import template from "./template";

export default class MessageForm extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }
    override render() {
        return template;
    }
}