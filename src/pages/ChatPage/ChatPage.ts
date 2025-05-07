import ChatLayout from "../../components/ChatLayout/ChatLayout";
import ChatList from "../../components/ChatList/ChatList";
import MessageBox from "../../components/MessageBox/MessageBox";
import MessageForm from "../../components/MessageForm/MessageForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import Component, {ComponentProps} from "../../services/Component";
import { messageList } from "../../utils/mock";
import template from "./template";

function onFocusMessage(id: string) {
    chatList.onFocusMessage(id);
}

function onChangeChatName(name: string) {
    chatLayout.changeChatName(name);
}

const messageForm = new MessageForm({});
const chatList = new ChatList({
    messages: [...messageList.map(message => new MessageBox({...message,
        onFocusMessage: onFocusMessage,
        onChangeName: onChangeChatName,
    }))],
});

const sideBar = new Sidebar({
    ChatList: chatList,
    events: {
        keyup: (evt: Event) => {
            const inputElement = evt.target as HTMLInputElement;
            const inputValue = inputElement.value.toUpperCase();
            if(inputValue === '') {
                chatList.setProps({
                    messages: [...messageList.map(message => new MessageBox({...message,
                        onFocusMessage: onFocusMessage,
                        onChangeName: onChangeChatName,
                    }))]
                })
            }
            else {
                const filterMessageList = messageList.filter(message => message.chatName.toUpperCase().includes(inputValue));
                chatList.setProps({
                    messages: [...filterMessageList.map(message => new MessageBox({...message, 
                        onFocusMessage: onFocusMessage,
                        onChangeName: onChangeChatName,
                    }))]
                })
            }
        },
    }
});
const chatLayout = new ChatLayout({
    isEmptyChat: true,
    MessageForm: messageForm,
});

export default class ChatPage extends Component {
    constructor(props: ComponentProps) {
        super({...props,
            SideBar: sideBar,
            ChatLayout: chatLayout,
        });
    }
    override render() {
        return template;
    }
}