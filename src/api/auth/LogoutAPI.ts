import { BaseAPI } from "../../services/BaseAPI";
import authAPIInstance from "./AuthAPIInstance";

export default class LogoutAPI extends BaseAPI {
    public create(): Promise<unknown> {
        return authAPIInstance.post('/logout');
    }
}
