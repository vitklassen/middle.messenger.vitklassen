import EventBus, { EventCallback } from './EventBus';
import { v4 as makeUuid } from 'uuid';
import Handlebars from 'handlebars';
import { isEqual } from '../utils/utils';
import { Indexed } from './Store';

type TCallback = (strArg: string) => void;
type TEventCallback = (evt: Event) => void;
type TAttr = Record<string, string>;
export type TEvents = Record<string, TEventCallback>;
type TProps = Record<string, string | number | boolean | TAttr | TEvents | Indexed[]>;
type TChildren = Record<string, Component>;
type TLists = Record<string, Component[]>; 
type CommonType = Component | Component[] | string | number | boolean | TAttr | TEvents | TCallback | Indexed[];

export type CallbackTuple = [string, TEventCallback];
export type ComponentProps = Record<string, CommonType>;

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  static _setUpdate: boolean = false;

  protected _element: HTMLElement | null = null;

  protected _id: string;

  protected _props: TProps;

  protected _children: TChildren;

  protected _lists: TLists;

  protected eventBus: () => EventBus;

  constructor(propsAndChildren: ComponentProps = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._id = makeUuid();
    const { props, children, lists } = this._splitPropsAndChildren(propsAndChildren);
    this._props = this._makePropsProxy({ ...props, _id: this._id }) as TProps;
    this._children = this._makePropsProxy(children) as TChildren;
    this._lists = this._makePropsProxy(lists) as TLists;
    this._registerEvents(eventBus);
    eventBus.notify(Component.EVENTS.INIT);
  }

  private _splitPropsAndChildren(propsAndChildren: ComponentProps):
  {
    props: TProps,
    children: TChildren,
    lists: TLists,
  } {
    const props: TProps = {};
    const children: TChildren = {};
    const lists: TLists = {};
    Object.keys(propsAndChildren).forEach(key => {
      const currentValue = propsAndChildren[key];
      if (currentValue instanceof Component) {
        children[key] = currentValue;
      } else if (Array.isArray(currentValue)) {
        if (currentValue.length > 0) {
          if (currentValue[0] instanceof Component) {
            lists[key] = currentValue as Component[];
          } else {
            props[key] = currentValue;
          }
        } else {
          props[key] = currentValue;
        }
      } else if (typeof currentValue === 'function') {
        return;
      } else {
        props[key] = currentValue;
      }
    });
        
    return { props, children, lists };
  }

  private _makePropsProxy(props: ComponentProps) {
    return new Proxy(props, {
      get(target: ComponentProps, prop: string) {
        const value = target[prop];
        return value;
      },
      set(target: ComponentProps, prop: string, value: CommonType) {
        if (target[prop] !== value) {
          target[prop] = value;
          Component._setUpdate = true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this) as EventCallback);
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
  }

  private _init(): void {
    this.eventBus().notify(Component.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this._children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps): void {
    const isUpdate = this.componentDidUpdate(oldProps, newProps);
    if (isUpdate) {
      this.eventBus().notify(Component.EVENTS.FLOW_RENDER);
    }
  }

  private _render(): void {
    const propsAndStubs = { ...this._props } as ComponentProps;
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id=${child._id}></div>`;
    });
    Object.entries(this._lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id=_l_${key}></div>`;
    });
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    Object.values(this._children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });
    Object.entries(this._lists).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id=_l_${key}]`);
      if (!stub) {
        return;
      }
      const listContent = this._createDocumentElement('template') as HTMLTemplateElement;
      child.forEach(item => {
        if (item instanceof Component) {
          listContent.content.append(item.getContent());
        } else {
          listContent.content.append(`${item}`);
        }
      });
      stub.replaceWith(listContent.content);
    });
    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this.removeEvents();
    this._element = newElement;
    this.addEvents();
    this.addAttributes();
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    return element;
  }

  public addEvents(): void {
    const { events = {} } = this._props;
    if (this._element instanceof HTMLElement) { 
      Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
        this._element!.addEventListener(eventName, eventCallback);
      });
    }
  }

  public removeEvents(): void {
    const { events = {} } = this._props;
    if (this._element instanceof HTMLElement) { 
      Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
        this._element!.removeEventListener(eventName, eventCallback);
      });
    }
  }

  public addAttributes() {
    const { attr = {} } = this._props;
    Object.entries(attr).forEach(([attrName, attrValue]: [string, string]) => {
      if (this._element) {
        this._element.setAttribute(attrName, attrValue);
      }
    });
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  public setProps(newProps: ComponentProps) {
    if (!newProps) {
      return;
    }
    Component._setUpdate = false;
    const oldValue = { ...this._props };
    const { props, children, lists } = this._splitPropsAndChildren(newProps);
    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }
    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }
    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
    }
    if (Component._setUpdate) {
      this.eventBus().notify(Component.EVENTS.FLOW_CDU, oldValue, this._props);
      Component._setUpdate = false;
    }
  }

  public componentDidMount(): void {}
    
  public dispatchComponentDidMount(): void {
    this.eventBus().notify(Component.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this.eventBus().notify(Component.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    return true;
  }

  public render() {}
}
