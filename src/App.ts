import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ChatPage from './pages/ChatPage/ChatPage';
import router from './services/Router';
import ProfilePreviewPage from './pages/ProfilePreviewPage/ProfilePreviewPage';
import ProfileGeneralPage from './pages/ProfileGeneralPage/ProfileGeneralPage';
import ProfilePasswordPage from './pages/ProfilePasswordPage/ProfilePasswordPage';
import { Routes } from './utils/constants';

export default class App {

  constructor() {
    this._initializeRoutes();
  }

  public run(): void {
    router.start();
  }

  private _initializeRoutes() {
    router.use(Routes.Error404, ErrorPage, false, { errorCode: 404, errorMessage: 'Не туда попали' });
    router.use(Routes.Error500, ErrorPage, false, { errorCode: 500, errorMessage: 'Уже фиксим' });
    router.use(Routes.SignIn, SignInPage, false);
    router.use(Routes.SignUp, SignUpPage, false);
    router.use(Routes.Messenger, ChatPage, true);
    router.use(Routes.Settings, ProfilePreviewPage, true);
    router.use(Routes.SettingsGeneral, ProfileGeneralPage, true);
    router.use(Routes.SettingsPassword, ProfilePasswordPage, true);
  }
}
