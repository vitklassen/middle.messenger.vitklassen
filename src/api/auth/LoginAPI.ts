import { BaseAPI } from "../../services/BaseAPI";
import { IOptions } from "../../services/HTTPTransport";
import authAPIInstance from "./AuthAPIInstance";
import TLoginFormModel from "../../models/auth/LoginFormModel";


export default class LoginAPI extends BaseAPI {
    public create(userData: TLoginFormModel): Promise<unknown> {
        const options: IOptions = {
            headers: {
                'content-type': 'application/json',
            },
            data: userData,
        }
        return authAPIInstance.post('/signin', options).then(response => {
            if(response.ok) {
                
            }
        });
    }
}