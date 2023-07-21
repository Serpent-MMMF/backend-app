import { Role } from "@prisma/client";
import { validateRoleMiddleware } from "./validate-role";

export const mentorCheckMiddleware = validateRoleMiddleware(Role.MENTOR);
