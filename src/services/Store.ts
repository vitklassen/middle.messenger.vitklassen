import { TGetChatResponse } from '../models/chats/types';
import { TUserInfoResponse } from '../models/auth/types';
import { set } from '../utils/utils';
import EventBus from './EventBus';
import { WSTransport } from './WSTransport';

type TStoreCallback = () => void;

export type Indexed<T = any> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = 'updated',
}

export type TStore = {
  currentUser?: TUserInfoResponse;
  chats?: TGetChatResponse[];
  currentChatId?: number;
  currentWS?: WSTransport
};

class Store extends EventBus<TStoreCallback> {
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
