import { Role } from "@prisma/client";

export type ITokenContent = {
  email: string;
  id: string;
  role: Role;
};

export const CONFIG = {
  JWT_SECRET: process.env.SECRET_KEY || "secret123",
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || "10"),
} as const;
