import TUserResponse from "../models/auth/UserModel"
import EventBus from "./EventBus"

type TState = {
    currentUser?: TUserResponse,
}

class Store extends EventBus {
    private state: TState = {};

    public getState() {
        return this.state;
    }

    public set() {

    }
}

const store = new Store();
export default store;
