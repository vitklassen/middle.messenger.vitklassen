import ChatHeader from '../../components/ChatHeader/ChatHeader';
import ChatLayout from '../../components/ChatLayout/ChatLayout';
import ChatList from '../../components/ChatList/ChatList';
import MessageBox from '../../components/MessageBox/MessageBox';
import MessageForm from '../../components/MessageForm/MessageForm';
import Popup from '../../components/Popup/Popup';
import PopupForm from '../../components/PopupForm/PopupForm';
import Sidebar from '../../components/Sidebar/Sidebar';
import Component from '../../services/Component';
import { messageList } from '../../utils/mock';
import template from './template';

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


const chatHeader = new ChatHeader({
  onOpenPopup: onOpenPopup,
});
const messageForm = new MessageForm({});
const chatLayout = new ChatLayout({
  isEmptyChat: true,
  ChatHeader: chatHeader,
  MessageForm: messageForm,
});

function onChangeChatName(name: string) {
  chatLayout.openChat();
  chatHeader.changeChatName(name);
}

function onOpenPopup(typePopup: string) {
  if (typePopup === 'add') {
    addPopup.open();
  } else if (typePopup === 'delete') {
    deletePopup.open();
  } else if (typePopup === 'delete-chat') {
    deleteChatPopup.open();
  }
}

const chatList = new ChatList({
  messages: [...messageList.map(message => new MessageBox({ ...message,
    onFocusMessage: onFocusMessage,
    onChangeName: onChangeChatName,
  }))],
});

function onFocusMessage(id: string) {
  chatList.onFocusMessage(id);
}

const sideBar = new Sidebar({
  ChatList: chatList,
  events: {
    keyup: (evt: Event) => {
      const inputElement = evt.target as HTMLInputElement;
      const inputValue = inputElement.value.toUpperCase();
      if (inputValue === '') {
        chatList.setProps({
          messages: [...messageList.map(message => new MessageBox({ ...message,
            onFocusMessage: onFocusMessage,
            onChangeName: onChangeChatName,
          }))],
        });
      } else {
        const filterMessageList = messageList.filter(message => message.chatName.toUpperCase().includes(inputValue));
        chatList.setProps({
          messages: [...filterMessageList.map(message => new MessageBox({ ...message, 
            onFocusMessage: onFocusMessage,
            onChangeName: onChangeChatName,
          }))],
        });
      }
    },
  },
});

export default class ChatPage extends Component {
  constructor() {
    super({
      SideBar: sideBar,
      ChatLayout: chatLayout,
      PopupAdd: addPopup,
      PopupDelete: deletePopup,
      PopupChatDelete: deleteChatPopup,
    });
  }

  override render() {
    return template;
  }
}