import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { userRepo } from "./repo/user";
import {
  authHandlers,
  bookGroupSessionHandlers,
  cityHandlers,
  groupSessionHandlers,
  provinceHandlers,
  tagHandlers,
} from "./handler";
import { IHandler } from "./handler/types";
import cors from "cors";

const app = express();
const port = 9999;

const registerRoutes = (app: Express, handlers: IHandler[]) => {
  handlers.forEach((handler) => {
    const { path, method, handler: handlerFunc, middlewares } = handler;
    app[method](path, ...middlewares, handlerFunc);
  });
};

const meta = {
  startTime: new Date(),
} as const;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/health", (req: Request, res: Response) => {
  res.send(
    "This server has been started since " + meta.startTime.toLocaleString()
  );
});

const handlers = [
  ...authHandlers,
  ...bookGroupSessionHandlers,
  ...cityHandlers,
  ...groupSessionHandlers,
  ...provinceHandlers,
  ...tagHandlers,
];
registerRoutes(app, handlers);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
