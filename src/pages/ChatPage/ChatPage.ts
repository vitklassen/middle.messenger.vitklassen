import { ChatHeader } from '../../components/ChatHeader/ChatHeader';
import { ChatLayout } from '../../components/ChatLayout/ChatLayout';
import { ChatList } from '../../components/ChatList/ChatList';
import MessageForm from '../../components/MessageForm/MessageForm';
import Popup from '../../components/Popup/Popup';
import PopupForm from '../../components/PopupForm/PopupForm';
import Sidebar from '../../components/Sidebar/Sidebar';
import chatsGettingController from '../../controllers/chats/ChatsGettingController';
import chatCreatingController from '../../controllers/chats/ChatCreatingController';
import { TCreateChatRequest } from '../../models/chats/types';
import Component from '../../services/Component';
import router from '../../services/Router';
import { debounce } from '../../utils/utils';
import template from './template';
import store from '../../services/Store';
import chatRemovalontroller from '../../controllers/chats/ChatRemovalController';
import userAPI from '../../api/users/UserAPI';
import userSearchController from '../../controllers/users/UserSearchController';
import chatUserGettingController from '../../controllers/chats/ChatUserGettingController';

const handleInput = (evt: Event) => {
  const inputElement = evt.target as HTMLInputElement;
  chatsGettingController.getChats({ title: inputElement.value }).catch(err => console.log(err));
};

const debounceInput = debounce(handleInput, 250);

const handleOpenPopup = (typePopup: string) => {
  if (typePopup === 'add') {
    chatUserAddingPopup.open()
  }
  // } else if (typePopup === 'delete') {
  //   deletePopup.open();
  // } else 
  else if (typePopup === 'delete-chat') {
    chatRemovalPopup.open();
  }
};

const userAddingForm = new PopupForm({
  buttonText: 'Добавить',
  buttonClassName: 'popup-form__submit-button_state_disabled',
  isUserAction: true,
  events: {
    submit: (evt: Event) => {
      evt.preventDefault();
      if(!userAddingForm.hasInvalidInput()) {
        const inputElement = chatAddingForm.getContent().querySelector('input') as HTMLInputElement;
        userSearchController.findUsers({login: inputElement.value})
        .then(users => {
          chatUserGettingController.addUser(users);
        })
        .catch(err => console.log(err));
        chatUserAddingPopup.close();
      }
    }
  }
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
        chatCreatingController.createChat({title: inputElement.value})
          .then(() => chatsGettingController.getChats())
          .catch(err => console.log(err));
        chatAddingPopup.close();
      }
    },
  },
});
const chatRemovalForm = new PopupForm({
  buttonText: 'Удалить',
  isChatDeleting: true,
  events: {
    submit: (evt: Event) => {
      evt.preventDefault();
      const { currentChatId } = store.getState();
      if (currentChatId) {
        chatRemovalontroller.deleteChat({ chatId: currentChatId })
          .then(() => chatsGettingController.getChats())
          .catch(err => console.log(err));
        store.set('currentChatId', undefined);
        chatRemovalPopup.close();
      }
    },
  },
});
const chatAddingPopup = new Popup({
  popupTitle: 'Добавить чат',
  PopupForm: chatAddingForm,
});
const chatRemovalPopup = new Popup({
  popupTitle: 'Удалить чат',
  PopupForm: chatRemovalForm,
  isCloseButton: true,
});
const chatUserAddingPopup = new Popup({
  popupTitle: 'Добавить пользователя',
  PopupForm: userAddingForm,
})
const chatList = new ChatList({});

const chatHeader = new ChatHeader({
  onOpenPopup: handleOpenPopup,
});

const messageForm = new MessageForm({});

const chatLayout = new ChatLayout({
  ChatHeader: chatHeader,
  MessageForm: messageForm,
  isEmptyChat: true,
});

const sideBar = new Sidebar({
  ChatList: chatList,
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
    },
  },
});

export default class ChatPage extends Component {
  constructor() {
    super({
      SideBar: sideBar,
      ChatLayout: chatLayout,
      ChatAddingPopup: chatAddingPopup,
      ChatRemovalPopup: chatRemovalPopup,
      ChatUserAddingPopup: chatUserAddingPopup
    });
  }

  override render() {
    return template;
  }
}
