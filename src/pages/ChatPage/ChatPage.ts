import ChatLayout from "../../components/ChatLayout/ChatLayout";
import MessageForm from "../../components/MessageForm/MessageForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import Component, {ComponentProps} from "../../services/Component";
import template from "./template";

const messageForm = new MessageForm({});
const sideBar = new Sidebar({});
const chatLayout = new ChatLayout({MessageForm: messageForm});

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