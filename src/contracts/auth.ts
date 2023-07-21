import { zoa } from "../util";
import { UserDTO } from "./user";

export const LoginData = zoa.object({
  user: UserDTO.openapi({
    description: "user data",
  }),
  token: zoa.string().openapi({
    description: "auth JWT token",
    example: "nasjfcnilkdsnkc",
  }),
});

