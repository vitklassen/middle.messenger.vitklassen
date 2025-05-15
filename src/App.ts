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
    const router = new Router('.app');
    this.router = () => router;
    this._initializeRoutes(router);
  }

  private _initializeRoutes(router: Router) {
    router.use('/not-found', ErrorPage)
    router.use('/', SignInPage);
  }
}
