import Block from "../../framework/Block";
import template from "./template";

type MessageBoxProps = {
    chatName: string,
    lastMessage: string,
    time: string,
    unreadMessages?: string 
}

class MessageBox extends Block {
    constructor(props: MessageBoxProps) {
        super({...props});
    }

    override render() {
        return template;
    }
}