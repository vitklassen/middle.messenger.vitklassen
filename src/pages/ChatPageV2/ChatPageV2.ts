import { ChatHeader } from '../../components/ChatHeaderV2/ChatHeaderV2';
import ChatLayout from '../../components/ChatLayout/ChatLayout';
import { ChatList } from '../../components/ChatListV2/ChatListV2';
import MessageForm from '../../components/MessageForm/MessageForm';
import Popup from '../../components/Popup/Popup';
import PopupForm from '../../components/PopupForm/PopupForm';
import Sidebar from '../../components/Sidebar/Sidebar';
import chatsController from '../../controllers/chats/ChatsController';
import Component from '../../services/Component';
import router from '../../services/Router';
import { debounce } from '../../utils/utils';
import template from './template';

const handleInput = debounce((evt: Event) => {
  const inputElement = evt.target as HTMLInputElement;
  chatsController.getChats({title: inputElement.value}).catch(err => console.log(err));
}, 500);

const addPopupForm = new PopupForm({
  buttonText: 'Добавить',
  buttonClassName: 'popup-form__submit-button_state_disabled',
});
const deletePopupForm = new PopupForm({
  buttonText: 'Удалить',
  buttonClassName: 'popup-form__submit-button_state_disabled',
});
const addPopup = new Popup({
  popupTitle: 'Добавить пользователя',
  Form: addPopupForm,
});
const deletePopup = new Popup({
  popupTitle: 'Удалить пользователя',
  Form: deletePopupForm,
});

const deleteChatPopup = new Popup({});

const chatList = new ChatList({});

const chatHeader = new ChatHeader({});

const messageForm = new MessageForm({});

const chatLayout = new ChatLayout({
  ChatHeader: chatHeader,
  MessageForm: messageForm,
  isEmptyChat: true
});

const sideBar = new Sidebar({
  ChatList: chatList,
  events: {
    input: handleInput,
    click: (evt: Event) => {
      evt.preventDefault();
      evt.stopPropagation();
      const linkElement = evt.target as HTMLLinkElement;
      router.go(linkElement.dataset.ref);
    },
    addChat: () => {
      
    }
  },
});

export default class ChatPageV2 extends Component {
    constructor() {
      super({
        SideBar: sideBar,
        ChatLayout: chatLayout,
      })
    }
    override render() {
      return template;
    }
}
