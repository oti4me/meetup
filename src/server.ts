import http, { Server } from 'http';
import dotenv from 'dotenv';
import App from './app';
import { Socket } from './socket';
import { dbInstance } from './database/db';
import Event from './events/Event';

const port: number = Number(process.env.PORT) || 3001;
const event = new Event().listen();
const app: App = new App();
global['eventEmitter'] = event.getEventEmitter();

dotenv.config();
dbInstance.authenticate();

const server: Server = http.createServer(app.getApp());

server.listen(port, () =>
  console.log(`Server started and listening on port ${port}`)
);

new Socket(server).start();
