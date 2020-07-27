import io, { Server as IOServer } from 'socket.io';
import { Server } from 'http';

export class Socket {
  /**
   * Instance of the socket io sever
   *
   * @private
   * @type {IOServer}
   * @memberOf Socket
   */
  private socketIO: IOServer;

  /**
   * Creates an instance of Socket.
   *
   * @param {Server} server
   *
   * @memberOf Socket
   */
  constructor(server: Server) {
    this.socketIO = io(server);
  }

  /**
   * Starts the socket io connection
   */
  public start() {
    this.socketIO.on('connection', (socket: any) => {
      console.log('a user connected');
      socket.on('message', (data: any) => console.log(data));
    });
  }
}
