import Component, { ComponentProps } from "../../services/Component";
import template from "./template";

export default class MessageBox extends Component {
    constructor(props: ComponentProps) {
        super({...props });
    }
    override render() {
        return template;
    }
}