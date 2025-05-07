import Component, { ComponentProps } from "../../services/Component";
import template from "./template";

export default class ChatLayout extends Component {
    constructor(props: ComponentProps) {
        super({...props});
    }
    public changeChatName(chatName: string) {
        if(chatName){
            this.setProps({
                chatName: chatName,
                isEmptyChat: false,
            });
        }
    }
    override render() {
        return template;
    }
}