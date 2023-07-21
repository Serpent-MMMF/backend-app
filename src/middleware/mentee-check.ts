import { Role } from "@prisma/client";
import { validateRoleMiddleware } from "./validate-role";

export const menteeCheckMiddleware = validateRoleMiddleware(Role.MENTEE);
