import { IHandler } from "../types";
import { getProfileHandler } from "./get-profile";
import { searchUserHandler } from "./search-user";
import { selfProfileHandler } from "./self-profile";
import { updateProfileHandler } from "./update-profile";

export const userHandlers: IHandler[] = [
  updateProfileHandler,
  selfProfileHandler,
  getProfileHandler,
  searchUserHandler,
];
