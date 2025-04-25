import {v4 as makeUuid} from 'uuid';
import EventBus, { EventCallback } from './EventBus';
import Handlebars from 'handlebars';

type BlockProps = {
  [key: string]: any;
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected _element: HTMLElement | null = null;

  protected _id: number;

  protected props: BlockProps;

  protected children: Record<string, Block>;

  protected eventBus: () => EventBus;

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenPropsAndProps(propsWithChildren);
    this._id = Number(makeUuid());
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.notify(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
  }

  protected init(): void {
    this.eventBus().notify(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().notify(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    //доработать сравнение пропсов - ?
    console.log(oldProps, newProps);
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>,
    props: BlockProps,
  } {
    const children: Record<string, Block> = {};
    const props: BlockProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        props[key] = value;
      }
    });

    return { children, props };
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props;
    
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  protected setAttributes(attr: any): void {
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    console.log('Render');
    const propsAndStubs = { ...this.props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  protected render() {}

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  private _makePropsProxy(props: any): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().notify(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
