import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {
  authHandlers,
  bookGroupSessionHandlers,
  cityHandlers,
  groupSessionHandlers,
  oneOnOneHandlers,
  provinceHandlers,
  tagHandlers,
} from "./handler";
import { discussionHandlers } from "./handler/discussion";
import { IHandler } from "./handler/types";
import { userHandlers } from "./handler/user";
import { generateDocs } from "./util/documentation";

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
  ...userHandlers,
  ...oneOnOneHandlers,
  ...discussionHandlers,
];
registerRoutes(app, handlers);

const options = {
  explorer: true,
};

const docs = generateDocs(handlers);
app.use("/", swaggerUi.serve, swaggerUi.setup(docs, options));

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
