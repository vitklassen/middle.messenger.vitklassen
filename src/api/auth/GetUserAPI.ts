import { BaseAPI } from "../../services/BaseAPI";
import authAPIInstance from "./AuthAPIInstance";

export default class GetUserAPI extends BaseAPI {
    public request(): Promise<unknown> {
        return authAPIInstance.get('/user');
    }
}
