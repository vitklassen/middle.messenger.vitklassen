import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatPage from './pages/ChatPage/ChatPage';
import router from './services/Router';

export default class App {

  constructor() {
    this._initializeRoutes();
  }

  public run(): void {
    router.start();
  }

  private _initializeRoutes() {
    router.use('/not-found', ErrorPage, { errorCode: 404, errorMessage: 'Не туда попали' });
    router.use('/', SignInPage);
    router.use('/sign-up', SignUpPage);
    router.use('/messenger', ChatPage);
    router.use('/settings', ProfilePage);
  }
}
