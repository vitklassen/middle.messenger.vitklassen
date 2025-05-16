import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatPage from './pages/ChatPage/ChatPage';
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
  }

  private _initializeRoutes(router: Router) {
    router.use('/not-found', ErrorPage, { errorCode: 404, errorMessage: 'Не туда попали' });
    router.use('/', SignInPage);
    router.use('/sign-up', SignUpPage);
    router.use('/messenger', ChatPage);
    router.use('/settings', ProfilePage);
  }
}
