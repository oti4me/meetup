import { Socket, Server } from 'socket.io';
import { Group } from '../models/index';

export class SocketController {
  public async registerGroups(
    groups: Group[],
    socket: Socket,
    socketIO: Server = null
  ) {
    try {
      groups.forEach(({ name, id }) => {
        socket.join(name);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public handleGroupChat(
    socket: Socket,
    { message, group }: any,
    socketIO: Server = null
  ) {
    if (message) {
      socketIO.to(group.name).emit('groupChat', {
        user: socket['user'],
        message,
      });
    }
  }

  public async handleDisconnect(socket: Socket, socketIO: Server = null) {
    const user = socket['user'];
    console.log(`${user.username} disconnected`);
    try {
      // send offline message to the client
    } catch (error) {
      console.log(error);
    }
  }
}
