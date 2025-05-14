import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatPage from './pages/ChatPage/ChatPage';
import NavigationPage from './pages/NavigationPage/NavigationPage';


export default class App {
  private currentPage: string;

  private appElement: HTMLElement | null;

  constructor() {
    this.currentPage = 'navigate';
    this.appElement = document.getElementById('app');
  }

  public render(): void {
    if (this.currentPage === 'navigate') {
      const navigationPage = new NavigationPage();
      this.appElement?.replaceChildren(navigationPage.getContent());
    } else if (this.currentPage === 'signin') {
      const signInPage = new SignInPage();
      this.appElement?.replaceChildren(signInPage.getContent());
    } else if (this.currentPage === 'signup') {
      const signUpPage = new SignUpPage();
      this.appElement?.replaceChildren(signUpPage.getContent());
    } else if (this.currentPage === 'profile') {
      const profilePage = new ProfilePage();
      this.appElement?.replaceChildren(profilePage.getContent());
    } else if (this.currentPage === 'chat') {
      const chatPage = new ChatPage();
      this.appElement?.replaceChildren(chatPage.getContent());
    } else if (this.currentPage === 'error-404') {
      const notFoundErrorPage = new ErrorPage({
        errorCode: 404,
        errorMessage: 'Не туда попали',
      });
      this.appElement?.replaceChildren(notFoundErrorPage.getContent());
    } else if (this.currentPage === 'error-5**') {
      const serverPage = new ErrorPage({
        errorCode: 500,
        errorMessage: 'Уже фиксим',
      });
      this.appElement?.replaceChildren(serverPage.getContent());
    }
    this._attachLinkEvents();
  }

  private _changePage(newPage: string = ''): void {
    this.currentPage = newPage;
    this.render();
  }

  private _attachLinkEvents(): void {
    const linksList = document.querySelectorAll('a');
    linksList.forEach(link => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        const linkItem = evt.target as HTMLLinkElement;
        this._changePage(linkItem.dataset.ref);
      });
    });
  }
}
