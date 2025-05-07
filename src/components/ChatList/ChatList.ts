import Component, { ComponentProps } from "../../services/Component";
import template from "./template";

export default class ChatList extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }
    override render(){
        console.log('chat:ist is render');
        return template;
    }
    public onFocusMessage(itemId: string = '') {
        if(itemId) {
            Object.entries(this._lists).forEach(([, messageList]) => {
                messageList.forEach(message => {
                    const liElement = message.getContent() as HTMLLIElement;
                    if(liElement.dataset.id === itemId) {
                        message.setProps({
                            attr: {
                                class: "message-box_type_active",
                            }
                        })
                    }
                    else {
                        message.setProps({
                            attr: {
                                class: "message-box",
                            }
                        })
                    }
                })
            })
        }
    }
}