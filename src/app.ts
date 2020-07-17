import express, { Application } from "express";
import morgan from "morgan";

class App {
  private app: Application;

  /**
   * Creates an instance of App.
   *
   * @memberOf App
   */
  constructor() {
    this.app = express();
    this.configure();
  }

  /**
   * configure
   */
  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
  }

  /**
   * Returns an instance of express application
   *
   * @returns {object} Application
   */
  public getApp(): Application {
    return this.app;
  }
}

export default App;
