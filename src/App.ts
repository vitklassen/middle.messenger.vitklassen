//@ts-nocheck
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


export default class App {
    private appElement: HTMLElement | null;
    constructor() {
        this.appElement = document.getElementById('app');
    }
    public render() {
        // const notFoundPage = new ErrorPage({
        //     errorCode: 404,
        //     errorMessage: "Не туда попали",
        //     href: "#",
        // });
        // const serverErrorPage = new ErrorPage({
        //     errorCode: 500,
        //     errorMessage: "Уже фиксим",
        //     href: "#",
        // });
        // const signInPage = new SignInPage();
        const signUpPage = new SignUpPage();
        //const profilePage = new ProfilePage();
        if (this.appElement) {
            this.appElement.appendChild(signUpPage.getContent());
        }
    }
     
}
