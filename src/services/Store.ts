import { set } from '../utils/utils';
import EventBus from './EventBus';

export type Indexed<T = any> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {};

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
