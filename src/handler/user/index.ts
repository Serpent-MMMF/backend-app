import { IHandler } from "../types";
import { getProfileHandler } from "./get-profile";
import { updateProfileHandler } from "./update-profile";
import { selfProfileHandler } from "./self-profile";
import { searchUserHandler } from "./search-user";

export const userHandlers: IHandler[] = [
  updateProfileHandler,
  selfProfileHandler,
  getProfileHandler,
  searchUserHandler,
];
