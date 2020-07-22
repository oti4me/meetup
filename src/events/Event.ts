import { EventEmitter } from 'events';
import { IListener } from './IListener';
import glob from 'glob';
import path from 'path';

class Event {
  /**
   * Instance of event emitter
   *
   * @private
   * @type {EventEmitter}
   * @memberOf Event
   */
  private eventEmitter: EventEmitter;

  /**
   * Creates an instance of Event.
   *
   * @memberOf Event
   */
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  /**
   * getListeners
   */
  public getListeners(): IListener[] {
    const listeners: IListener[] = [];

    glob.sync('./src/listeners/*.ts').forEach(function (file: string) {
      const Listener = require(path.resolve(file)).default;
      listeners.push(new Listener());
    });

    return listeners;
  }

  /**
   * Returns a single event emmiter object to use application-wide
   *
   * @returns {object} EventEmitter
   */
  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  /**
   * Returns a single event emmiter object to use application-wide
   */
  public emit<T>(type: string, data: T): void {
    this.eventEmitter.emit(type, data);
  }

  /**
   * Listens to  all registered events
   *
   * @memberOf Event
   */
  public listen() {
    this.getListeners().forEach((handler: IListener) => {
      this.eventEmitter.on(handler.getName(), (data) => handler.handle(data));
    });

    return this;
  }
}

export default Event;
