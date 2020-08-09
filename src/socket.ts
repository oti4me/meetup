import io, { Server as IOServer } from 'socket.io';
import { Server } from 'http';
import { SocketController } from './controllers/SocketController';
import { decode } from '../src/helpers/jwt';

export class Socket {
  /**
   * Instance of the socket io sever
   *
   * @private
   * @type {IOServer}
   * @memberOf Socket
   */
  private socketIO: IOServer;
  private socketController: SocketController;

  /**
   * Creates an instance of Socket.
   *
   * @param {Server} server
   *
   * @memberOf Socket
   */
  constructor(server: Server) {
    this.socketIO = io(server);
    this.socketController = new SocketController();
  }

  /**
   * Starts the socket io connection
   */
  public start() {
    this.socketIO.use(async (socket, next) => {
      try {
        const token = socket.handshake.query.token;
        const [user, error] = await decode(token);
        if (error) return next(error);
        socket['user'] = user;

        return next();
      } catch (error) {
        next(error);
      }
    });

    this.socketIO.on('connection', (socket: any) => {
      socket.on('online', ({ groups }) => {
        this.socketController.registerGroups(groups, socket, this.socketIO);
      });

      socket.on('groupChat', (data: any) => {
        this.socketController.handleGroupChat(socket, data, this.socketIO);
      });

      socket.on('disconnect', () => {
        this.socketController.handleDisconnect(socket, this.socketIO);
      });
    });
  }
}
