import userDataController from '../controllers/auth/UserDataController';
import Component, { ComponentProps } from './Component';
import Route from './Route';
import store from './Store';

class Router {
  static __instance: Router | null;

  protected _routes!: Route[];

  protected _history!: Window['history'];

  protected _currentRoute!: Route | null;

  protected _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  public use(pathName: string, view: typeof Component, isProtected: boolean, componentProps?: ComponentProps): Router {
    const route = new Route({ pathName: pathName, view: view, rootQuery: this._rootQuery, componentProps: componentProps, isProtected: isProtected });
    this._routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget instanceof Window) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  public go(pathName: string = ''): void {
    this._history.pushState({}, '', pathName);
    this._onRoute(pathName);
  }

  public back(): void {
    this._history.back();
  }

  public forward(): void {
    this._history.forward();
  }

  private _onRoute(pathName: string): void {
    const route = this._getRoute(pathName);
    if(route.isProtected) {
      if(!('currentUser' in store.getState())) {
        userDataController.getUserData()
        .then(response => {
          
        })
        .catch(err => {
          this.go('/');
        });
      }
    }
    this._currentRoute = route;
    route.render();
  }

  private _getRoute(pathName: string): Route {
    const currentRoute = this._routes.find(route => route.matchPath(pathName));
    if (!currentRoute) {
      const notFoundErrorRoute = this._routes.find(route => route.matchPath('/not-found'));
      if (!notFoundErrorRoute) {
        throw new Error('');
      }
      return notFoundErrorRoute;
    }
    return currentRoute;
  }
}
const router = new Router('app');

export default router;