import { IHandler } from "../types";
import { createDiscussionHandler } from "./create-discussion";
import { getDiscussionHandler } from "./get-discussion";

export const cityHandlers: IHandler[] = [
  getDiscussionHandler,
  createDiscussionHandler,
];
