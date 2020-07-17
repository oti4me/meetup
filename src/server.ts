import http, { Server } from "http";
import dotenv from "dotenv";
import App from "./app";
import { Socket } from "./socket";
import DB from "./database/db";

const port: number = Number(process.env.PORT) || 3001;
const app: App = new App();
const db: DB = new DB();

dotenv.config();
db.authenticate();
const server: Server = http.createServer(app.getApp());

server.listen(port, () =>
  console.log(`Server started and listening on port ${port}`)
);

new Socket(server).start();
