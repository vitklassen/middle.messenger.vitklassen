import Component from './Component';

type TRouteProps = {
  pathName: string, 
  view: typeof Component,
  rootQuery: string
};
export default class Route {
  private _pathName: string;

  private _componentClass: typeof Component;

  private _component: Component | null;

  private _rootQuery: string;

  constructor(props: TRouteProps) {
    const { pathName, view, rootQuery } = props;
    this._pathName = pathName;
    this._componentClass = view;
    this._component = null;
    this._rootQuery = rootQuery;
  }

  public render(route: Route, pathName: string): void {
    this._component = new this._componentClass();
  }

  public leave(): void {
    
  }

  public matchPath(pathName: string): boolean {
    return pathName === this._pathName;
  }
}