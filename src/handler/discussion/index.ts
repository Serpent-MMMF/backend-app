import { IHandler } from "../types";
import { createDiscussionHandler } from "./create-discussion";
import { getDiscussionHandler } from "./get-discussion";

export const discussionHandlers: IHandler[] = [
  getDiscussionHandler,
  createDiscussionHandler,
];
