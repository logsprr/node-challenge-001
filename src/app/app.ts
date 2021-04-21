import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

export class App {
  private server: Application;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/api', routes);
  }

  listen(port: Number) {
    return this.server.listen(port);
  }
}
