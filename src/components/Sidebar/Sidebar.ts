import Component, { ComponentProps } from "../../services/Component";
import template from "./template";
import { messageList } from "../../utils/mock";
import MessageBox from "../MessageBox/MessageBox";

const messages = [...messageList.map(message => new MessageBox({...message, 
    events: {
        click: (evt: Event) => {
            const liElement = evt.currentTarget as HTMLLIElement;
            const liElementId = liElement.dataset.id;
            messages.forEach(message => {
                const currentElement = message.getContent() as HTMLLIElement;
                const currentElementId = currentElement.dataset.id;
                let className = "";
                if(currentElementId !== liElementId) {
                    className= "message-box";
                }
                else {
                    className= "message-box message-box_type_active";
                }
                message.setProps({
                    attr: {
                        class: className,
                    }
                })
            })
        }
    }
}))];

export default class Sidebar extends Component {
    constructor(props: ComponentProps) {
        super({...props, 
            messages: messages
        });
    }
    override render() {
        return template;
    }
}