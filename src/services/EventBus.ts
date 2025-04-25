export type EventCallback = (...arg: any[]) => void;

export default class EventBus {
    private listeners: Record<string, EventCallback[]> = {};
    public on(eventName: string, callback: EventCallback): void {
        if(!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }
    public off(eventName: string, callback: EventCallback): void {
        if(!this.listeners[eventName]) {
            throw new Error(`Нет события: ${eventName}`);
        }
        this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== callback);
    }
    public notify(eventName: string, ...arg: any[]): void {
        if(!this.listeners[eventName]) {
            throw new Error(`Нет события: ${eventName}`);
        }
        this.listeners[eventName].forEach(listener => {listener(...arg)});
    }
}