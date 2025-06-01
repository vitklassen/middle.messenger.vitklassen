import { set } from '../utils/utils';
import EventBus from './EventBus';

export type Indexed<T = any> = {
  [key in string]: T;
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
  }
}

const store = new Store();
export default store;
