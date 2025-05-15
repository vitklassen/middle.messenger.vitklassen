import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatPage from './pages/ChatPage/ChatPage';
import NavigationPage from './pages/NavigationPage/NavigationPage';
import Router from './services/Router';


export default class App {
  private router: () => Router;

  constructor() {
    const router = new Router('app');
    this.router = () => router;
    this._initializeRoutes(router);
  }

  public run(): void {
    this.router().start();
    this._attachLinkEvents();
  }

  private _initializeRoutes(router: Router) {
    router.use('/not-found', ErrorPage, {errorCode: 404, errorMessage: 'Не туда попали'})
    router.use('/', SignInPage);
  }

  private _attachLinkEvents(): void {
    const linksList = document.querySelectorAll('#app [href^="/"]');
    linksList.forEach(link => {
        console.log(link);
        link.addEventListener('click', (evt: Event) => {
          evt.preventDefault();
          const linkElement = evt.target;
          if(linkElement instanceof HTMLLinkElement) {
            this.router().go(linkElement.href);
          }      
        });
    })
  }
}
