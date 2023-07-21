import { IHandler } from "../types";
import { createBookGroupSessionHandler } from "./create-book-group-session";
import { getBookGroupSessionHandler } from "./get-book-group-session";
import { getDetailBookGroupSessionHandler } from "./get-detail-book-group-session";

export const bookGroupSessionHandlers: IHandler[] = [
  createBookGroupSessionHandler,
  getBookGroupSessionHandler,
  getDetailBookGroupSessionHandler,
];
