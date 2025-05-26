import { BaseAPI } from "../../services/BaseAPI";
import { IOptions } from "../../services/HTTPTransport";
import authAPIInstance from "./AuthAPIInstance";
import TRegisterFormModel from "../../models/auth/RegisterFormModel";

export default class RegisterAPI extends BaseAPI {
    public create(userData: TRegisterFormModel): Promise<unknown> {
        const options: IOptions = {
            headers: {
                'content-type': 'application/json',
            },
            data: userData,
        }
        return authAPIInstance.post('/signup', options);
    }
}