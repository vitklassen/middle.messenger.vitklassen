import Component, { ComponentProps } from "../../services/Component";
import template from "./template";
import { messageList } from "../../utils/mock";
import MessageBox from "../MessageBox/MessageBox";
import ChatList from "../ChatList/ChatList";

const chatList = new ChatList({
    messages: [...messageList.map(message => new MessageBox({...message,
        events: {
            click: (evt: Event) => {
                const liElement = evt.currentTarget as HTMLLIElement;
                chatList.onMessageFocus(liElement.dataset.id);
            }
        }
    }))],
});

export default class Sidebar extends Component {
    constructor(props: ComponentProps) {
        super({...props, 
            ChatList: chatList,
            events: {
                keyup: (evt: Event) => {
                    const inputElement = evt.target as HTMLInputElement;
                    const inputValue = inputElement.value.toUpperCase();
                    if(inputValue === '') {
                        chatList.setProps({
                            messages: [...messageList.map(message => new MessageBox({...message,
                                events: {
                                    click: (evt: Event) => {
                                        const liElement = evt.currentTarget as HTMLLIElement;
                                        chatList.onMessageFocus(liElement.dataset.id);
                                    }
                                }
                            }))]
                    })
                    }
                    else {
                        const filterMessageList = messageList.filter(message => message.chatName.toUpperCase().includes(inputValue));
                        chatList.setProps({
                            messages: [...filterMessageList.map(message => new MessageBox({...message, 
                                events: {
                                    click: (evt: Event) => {
                                        const liElement = evt.currentTarget as HTMLLIElement;
                                        chatList.onMessageFocus(liElement.dataset.id);
                                    }
                                }
                            }))]
                        })
                    }
                },
            }
        });
    }
    override addEvents() {
        const {events = {}} = this._props;
        if(this._element instanceof HTMLElement) { 
            Object.entries(events).forEach(([eventName, eventCallback]) => {
                if(eventName === "keyup") {
                    const inputElementElement = this.getContent().querySelector('input') as HTMLInputElement;
                    inputElementElement.addEventListener(eventName, eventCallback);
                }
                else {
                    this.getContent().addEventListener(eventName, eventCallback);
                }
            });
        }
    }
    override render() {
        return template;
    }
    public changeColor() {
        
    }
}