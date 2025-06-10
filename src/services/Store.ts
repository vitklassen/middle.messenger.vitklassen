import TChatResponse from '../models/chats/ChatResponse';
import TUserResponse from '../models/users/UserResponse';
import { set } from '../utils/utils';
import EventBus from './EventBus';

export type Indexed<T = any> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = 'updated',
}

export type TStore = {
  currentUser?: TUserResponse;
  chats?: TChatResponse[];
  currentChatId?: number;
};

class Store extends EventBus {
  private state: TStore = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.notify(StoreEvents.Updated);
  }
}

const store = new Store();
export default store;
