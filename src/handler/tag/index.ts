import { IHandler } from "../types";
import { getTagHandler } from "./get-tag";
import { getTagListHandler } from "./get-tag-list";

export const tagHandlers: IHandler[] = [getTagHandler, getTagListHandler];
