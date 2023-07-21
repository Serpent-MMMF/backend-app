import { zoa } from "../util";
import { BaseResponse } from "./base";
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

export const RespLogin = BaseResponse.merge(
  zoa.object({
    data: LoginData,
  })
);

export const RegisterData = UserDTO;

export const RespRegister = BaseResponse.merge(
  zoa.object({
    data: RegisterData,
  })
);
