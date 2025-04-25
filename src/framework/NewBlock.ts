import {v4 as makeUuid} from 'uuid';
import EventBus, { EventCallback } from './EventBus';
import Handlebars from 'handlebars';

export type BlockProps = {
  children?: NewBlock[];
  events?: Record<string, (event: Event) => void>;
  attr?: Record<string, string>
};

type BlockProps1 = {
  children?: NewBlock[];
  events?: Record<string, (event: Event) => void>;
  attr?: Record<string, string>
}

type BlockProps2 = Record<string, string | number | boolean>

type ResultProps = BlockProps1 | BlockProps2;

export default class NewBlock {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected _element: HTMLElement | null = null;

  protected _id: string;

  protected props: ResultProps;

  protected children: NewBlock[];
  
  protected _childrenId: string[] = [];

  protected eventBus: () => EventBus;

  constructor(propsWithChildren: ResultProps = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenPropsAndProps(propsWithChildren);
    this._id = makeUuid();
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.notify(NewBlock.EVENTS.INIT);
  }

  private _addEvents(): void {
    let { events = {} } = this.props;
    events = events as Record<string, (event: Event) => void>;
    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(NewBlock.EVENTS.INIT, this.init.bind(this) as EventCallback);
    eventBus.on(NewBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
    eventBus.on(NewBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(NewBlock.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
  }

  protected init(): void {
    this.eventBus().notify(NewBlock.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.children.forEach(child => {child.dispatchComponentDidMount();});
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().notify(NewBlock.EVENTS.FLOW_CDM);
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
    children: NewBlock[],
    props: BlockProps,
  } {
    let children: NewBlock[] = [];
    const props: BlockProps = {...propsAndChildren};
    if(propsAndChildren.children) {
        children = propsAndChildren.children;
        delete props.children;
    }
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
    const propsAndStubs = { ...this.props, childrenId: this._childrenId };
    this.children.forEach(child => {
      this._childrenId.push(child._id);
    });
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    this.children.forEach(child => {
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
        self.eventBus().notify(NewBlock.EVENTS.FLOW_CDU, oldTarget, target);
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
