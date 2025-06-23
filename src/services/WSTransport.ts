import EventBus from './EventBus';

type MessageData = string | number | object;
type TWSCallback = (data?: MessageData) => void;

export class WSTransport extends EventBus<TWSCallback> {
  static EVENTS = {
    CONNECTED: 'connect',
    CLOSE: 'close',
    MESSAGE: 'message',
    ERROR: 'error',
  } as const;

  private socket?: WebSocket;

  private pingInterval?: ReturnType<typeof setInterval>;

  private readonly pingIntervalTime = 30000;

  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: MessageData) {
    if(!this.socket) {
      throw new Error('Socket is not connected');
    }
    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('The socket is already connected');
    }
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();
    return new Promise((resolve, reject) => {
      this.on(WSTransport.EVENTS.ERROR, reject);
      this.on(WSTransport.EVENTS.CONNECTED, () => {
        this.off(WSTransport.EVENTS.ERROR, reject);
        resolve();
      });
    })
  }
  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }
  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({type: 'ping'});
    }, this.pingIntervalTime);
    this.on(WSTransport.EVENTS.CLOSE, () => {
        clearInterval(this.pingInterval);
        this.pingInterval = undefined;
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.notify(WSTransport.EVENTS.CONNECTED);
    });
    socket.addEventListener('close', () => {
      this.notify(WSTransport.EVENTS.CLOSE);
    });
    socket.addEventListener('error', (evt: Event) => {
      this.notify(WSTransport.EVENTS.ERROR, evt);
    });
    socket.addEventListener('message', (message: MessageEvent) => {
      try {
        const data = JSON.parse(message.data);
        if (['pong', 'user connected'].includes(data?.type)) {
          return;
        }
        this.notify(WSTransport.EVENTS.MESSAGE, data);
      } catch (error) {
        console.log(error);
      }
    }); 
  }
}
