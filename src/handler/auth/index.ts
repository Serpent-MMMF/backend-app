import { loginHandler } from "./login";
import { IHandler } from "../types";
import { registerHandler } from "./register";

export const authHandlers: IHandler[] = [loginHandler, registerHandler];
