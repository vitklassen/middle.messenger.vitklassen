import Component, { ComponentProps } from './Component';

type TRouteProps = {
  pathName: string, 
  view: typeof Component,
  rootQuery: string,
  componentProps?: ComponentProps
};
export default class Route {
  private _pathName: string;

  private _componentClass: typeof Component;

  private _component: Component | null;

  private _rootQuery: string;

  private _componentProps: ComponentProps | undefined;

  constructor(props: TRouteProps) {
    const { pathName, view, rootQuery, componentProps } = props;
    this._pathName = pathName;
    this._componentClass = view;
    this._component = null;
    this._rootQuery = rootQuery;
    this._componentProps = componentProps;
  }

  public render(): void {
    this._component = this._componentProps ? new this._componentClass(this._componentProps): new this._componentClass();
    const root = document.getElementById(this._rootQuery);
    if(root instanceof Element) {
      root.replaceChildren(this._component.getContent());
    } 
  }

  public matchPath(pathName: string): boolean {
    return pathName === this._pathName;
  }
}