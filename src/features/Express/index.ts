import express, {Express} from "express";
import {TMethods} from "shared";

export class ExpressServer {
  private app: Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(express.json())
  }

  private dbConnect() {
    // TODO
  }

  private createEndpoint(method: TMethods, path: string, handler: Function) {
    // TODO
  }

  initEndpoints() {
    this.app.get('/', (req, res) => {
      console.log(req.body)
      res.status(200).json(`${req.method} on ${req.path}`);
    })

  }

  start(PORT?: number) {
    if (!PORT) {
      throw new Error('Invalid port for server start');
    }

    this.initEndpoints();

    this.app.listen(PORT, () => {
      console.log('EXPRESS: Server is running');
    })
  }

}