import { ChatList } from '../../components/ChatListV2/ChatListV2';
import Sidebar from '../../components/Sidebar/Sidebar';
import Component from '../../services/Component';
import router from '../../services/Router';

const chatList = new ChatList({});

const sideBar = new Sidebar({
  events: {
    keyup: (evt: Event) => {
      setTimeout(() => {}, 500);
    },
    click: (evt: Event) => {
      evt.preventDefault();
      const linkElement = evt.target as HTMLLinkElement;
      router.go(linkElement.dataset.ref);
    },
  },
});

export default class ChatPageV2 extends Component {
    
}