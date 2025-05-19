import Component, { ComponentProps } from './Component';
import Route from './Route';

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

  public use(pathName: string, view: typeof Component, componentProps?: ComponentProps): Router {
    const route = new Route({ pathName: pathName, view: view, rootQuery: this._rootQuery, componentProps: componentProps });
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
    this._deleteLinkEventListener();
    const route = this._getRoute(pathName);
    this._currentRoute = route;
    route.render();
    this._attachLinkEventListener();
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

  private _attachLinkEventListener(): void {
    const navigateLinksList = document.querySelectorAll('#app [href^="/"]');
    const navigateButtonsList = document.querySelectorAll('#app [id^="navigate-button"]');
    const navigateElementsArray = [...navigateLinksList, ...navigateButtonsList];
    navigateElementsArray.forEach(navigateElement => {
      navigateElement.addEventListener('click', this._handleNavigateElementClick.bind(this));
    });
  }

  private _deleteLinkEventListener(): void {
    const navigateLinksList = document.querySelectorAll('#app [href^="/"]');
    const navigateButtonsList = document.querySelectorAll('#app [id^="navigate-button"]');
    const navigateElementsArray = [...navigateLinksList, ...navigateButtonsList];
    navigateElementsArray.forEach(navigateElement => {
      navigateElement.removeEventListener('click', this._handleNavigateElementClick.bind(this));
    });
  }

  private _handleNavigateElementClick(evt: Event): void {
    evt.preventDefault();
    const navigateElement = evt.target as HTMLLinkElement | HTMLButtonElement;
    this.go(navigateElement.dataset.ref);
  }
}

export default Router;