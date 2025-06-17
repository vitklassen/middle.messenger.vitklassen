import { ChatHeader } from '../../components/ChatHeaderV2/ChatHeaderV2';
import { ChatLayout } from '../../components/ChatLayout/ChatLayout';
import { ChatList } from '../../components/ChatListV2/ChatListV2';
import MessageForm from '../../components/MessageForm/MessageForm';
import Popup from '../../components/Popup/Popup';
import PopupForm from '../../components/PopupForm/PopupForm';
import Sidebar from '../../components/Sidebar/Sidebar';
import chatsController from '../../controllers/chats/ChatsController';
import NewChatRequest from '../../models/chats/NewChatRequest';
import Component from '../../services/Component';
import router from '../../services/Router';
import { debounce } from '../../utils/utils';
import template from './template';

const handleInput = (evt: Event) => {
  const inputElement = evt.target as HTMLInputElement;
  chatsController.getChats({title: inputElement.value}).catch(err => console.log(err));
};

const debounceInput = debounce(handleInput, 250);

const userAddingForm = new PopupForm({
  buttonText: 'Добавить',
  buttonClassName: 'popup-form__submit-button_state_disabled',
  isUserAction: true,
});
const userRemovalForm = new PopupForm({
  buttonText: 'Удалить',
  buttonClassName: 'popup-form__submit-button_state_disabled',
  isUserAction: true,
});
const chatAddingForm = new PopupForm({
  buttonText: 'Добавить',
  buttonClassName: 'popup-form__submit-button_state_disabled',
  isChatAdding: true,
  events: {
    submit: (evt: Event) => {
      evt.preventDefault();
      if (!chatAddingForm.hasInvalidInput()) {
        const inputElement = chatAddingForm.getContent().querySelector('input') as HTMLInputElement;
        const request: Record<string, string | number> = {};
        request[inputElement.name] = inputElement.value;
        chatsController.createChat(request as NewChatRequest).catch(err => console.log(err));
        chatAddingPopup.close();
      }
    }
  }
});
const chatAddingPopup = new Popup({
  popupTitle: "Добавить чат",
  PopupForm: chatAddingForm,
});

const chatList = new ChatList({});

const chatHeader = new ChatHeader({});

const messageForm = new MessageForm({});

const chatLayout = new ChatLayout({
  ChatHeader: chatHeader,
  MessageForm: messageForm,
  isEmptyChat: true,
});

const sideBar = new Sidebar({
  ChatList: chatList,
  ChatAddingPopup: chatAddingPopup,
  events: {
    input: debounceInput,
    click: (evt: Event) => {
      evt.preventDefault();
      evt.stopPropagation();
      const linkElement = evt.target as HTMLLinkElement;
      router.go(linkElement.dataset.ref);
    },
    addChat: () => {
      chatAddingPopup.open();
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
