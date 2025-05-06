import Component, { ComponentProps } from "../../services/Component";
import template from "./template";

export default class MessageBox extends Component {
    constructor(props: ComponentProps) {
        super({...props });
    }
    override addEvents() {
        const {events = {}} = this._props;
        if(this._element instanceof HTMLElement) { 
            Object.entries(events).forEach(([eventName, eventCallback]) => {
                if(eventName === 'click') {
                    const liElement = this.getContent() as HTMLLIElement;
                    liElement.addEventListener(eventName, eventCallback);
                }
            });
        }
    }
    override render() {
        return template;
    }
}