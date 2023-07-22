import { IHandler } from "../types";
import { createGroupSessionHandler } from "./create-group-session";
import { getDetailGroupSessionHandler } from "./get-detail-group-session";
import { getGroupSessionHandler } from "./get-group-session";
import { getDetailGroupSessionSelfHandler } from "./get-detail-group-session-self";

export const groupSessionHandlers: IHandler[] = [
  createGroupSessionHandler,
  getGroupSessionHandler,
  getDetailGroupSessionHandler,
  getDetailGroupSessionSelfHandler,
];
