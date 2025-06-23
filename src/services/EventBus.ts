export default class EventBus<T extends Function> {
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

  public notify(eventName: string, ...arg: unknown[]): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }
    this.listeners[eventName].forEach(listener => {listener(...arg)});
  }
}
