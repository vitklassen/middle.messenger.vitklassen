import { ComponentProps } from './Component';

export type EventCallback = (...arg: ComponentProps[]) => void;

export default class EventBus {
  private listeners: Record<string, EventCallback[]> = {};

  public on(eventName: string, callback: EventCallback): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  public off(eventName: string, callback: EventCallback): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }
    this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== callback);
  }

  public notify(eventName: string, ...arg: ComponentProps[]): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }
    this.listeners[eventName].forEach(listener => {listener(...arg);});
  }
}

export class EventEmitter<T extends Function, U> {
  private listeners: Record<string, T[]> = {};

  public on(eventName: string, callback: T): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  public off(eventName: string, callback: T): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }
    this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== callback);
  }

  public notify(eventName: string, ...arg: U[]): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }
    this.listeners[eventName].forEach(listener => {listener(...arg);});
  }
}
