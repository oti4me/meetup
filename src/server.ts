import http from "http";
import dotenv from "dotenv";
import App from "./app";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = new App().getApp();
const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`Server started and listening on port ${PORT}`)
);
