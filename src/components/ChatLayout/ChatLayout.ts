import Component, { ComponentProps } from '../../services/Component';
import { TStore } from '../../services/Store';
import { connect } from '../../utils/utils';
import template from './template';

class ChatLayoutV2 extends Component {
  constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}

function mapChatLayout(state: TStore) {
  if (state.currentChatId) {
    return { 
      isEmptyChat: false,
      chats: state.currentMessages ? state.currentMessages : [],
    };
  } else {
    return { isEmptyChat: true };
  }
}

export const ChatLayout = connect<typeof ChatLayoutV2>(ChatLayoutV2, mapChatLayout);
