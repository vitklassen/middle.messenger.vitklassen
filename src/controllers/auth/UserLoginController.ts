import TLoginFormModel from "../../models/auth/LoginFormModel";
import LoginAPI from "../../api/auth/LoginAPI";

const loginAPI = new LoginAPI();

class UserLoginController {
    public async login(data: TLoginFormModel) {
        try {
            const isLogin = await loginAPI.create(data);
        }
        catch (error) {

        }
    }
}