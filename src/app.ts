import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { notFound, errorHandler } from './middlewares/error';
import api from './routes/index';

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
   * configure application dependencies
   */
  private configure() {
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use('/api/v1', api);
    this.app.get('/', this.welcome);
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  /**
   * Display welcome message to visitors of the API
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   *
   * @returns {Response}
   *
   * @memberOf App
   */
  private welcome(req: Request, res: Response): Response {
    const doc = `${process.env.DOCURL}`;
    return res.status(200).json({
      status: 'success',
      message: `Welcome to the meetup API, please consult \
        the API documentatuon for more info on ${doc}`,
    });
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
