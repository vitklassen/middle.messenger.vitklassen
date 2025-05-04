import Component, { ComponentProps } from "../../services/Component";
import template from "./template";

export default class Sidebar extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }
    override render() {
        return template;
    }
}