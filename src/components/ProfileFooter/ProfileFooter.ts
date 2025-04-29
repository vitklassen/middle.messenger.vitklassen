import Component, { ComponentProps } from "../../services/Component";
import template from "./template";

export default class ProfileFooter extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }

    override addEvents(): void {
        const {events = {}} = this._props;
        Object.entries(events).forEach(([eventName, eventCallback]) => {
            if(eventName === "click") {
                const buttonList = this.getContent().querySelectorAll("button");
                buttonList?.forEach(button => {
                    button.addEventListener(eventName, eventCallback);
                });
            }
            else {
                this.getContent().addEventListener(eventName, eventCallback);
            }
        });
    }

    override render() {
        console.log('profileFooter is render');
        return template;
    }
}