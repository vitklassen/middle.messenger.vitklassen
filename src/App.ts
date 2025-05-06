import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Sidebar from "./components/Sidebar/Sidebar";

export default class App {
    private currentPage: string;
    private appElement: HTMLElement | null;
    constructor() {
        this.currentPage = "chat";
        this.appElement = document.getElementById('app');
    }
    public render(): void {
        if(this.currentPage === "signin") {
            const signInPage = new SignInPage();
            this.appElement?.replaceChildren(signInPage.getContent());
        }
        else if(this.currentPage === "signup") {
            const signUpPage = new SignUpPage();
            this.appElement?.replaceChildren(signUpPage.getContent());
        }
        else if(this.currentPage === "profile") {
            const profilePage = new ProfilePage();
            this.appElement?.replaceChildren(profilePage.getContent());
        }
        else if(this.currentPage === "chat") {
            const sideBar = new Sidebar({});
            this.appElement?.replaceChildren(sideBar.getContent());
        }
        this._attachLinkEvents();
    }

    private _changePage(newPage: string = ''): void {
        this.currentPage = newPage;
        this.render();
    }

    private _attachLinkEvents(): void {
        const linksList = document.querySelectorAll("a");
        linksList.forEach(link => {
            link.addEventListener('click', (evt) => {
                evt.preventDefault();
                const linkItem = evt.target as HTMLLinkElement;
                this._changePage(linkItem.dataset.ref);
            })
        })
    }
}
