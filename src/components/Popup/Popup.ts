import Component, { ComponentProps } from "../../services/Component";
import template from "./template";

export default class Popup extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }
    public open() {
        this.setProps({
            attr: {
                class: "popup popup_state_opened"
            }
        });
    }
    public close() {
        this.setProps({
            attr: {
                class: "popup"
            }
        });
    }
    override render() {
        return template;
    }
}