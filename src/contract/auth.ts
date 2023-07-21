import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";
import { UserDTO } from "./user";

export const ReqLogin = zoa.object({
  email: zoa.string().openapi({
    description: "user's email",
    example: "user@gmail.com",
  }),
  password: zoa.string().openapi({
    description: "user's password",
    example: "password",
  }),
});
export type IReqLogin = z.infer<typeof ReqLogin>;

export const LoginData = zoa.object({
  user: UserDTO.openapi({
    description: "user data",
  }),
  token: zoa.string().openapi({
    description: "auth JWT token",
    example: "nasjfcnilkdsnkc",
  }),
});
export type ILoginData = z.infer<typeof LoginData>;

export const RespLogin = BaseResponse.merge(
  zoa.object({
    data: LoginData.optional(),
  })
);
export type IRespLogin = z.infer<typeof RespLogin>;

export const RegisterData = UserDTO;

export const RespRegister = BaseResponse.merge(
  zoa.object({
    data: RegisterData.optional(),
  })
);
export type IRespRegister = z.infer<typeof RespRegister>;
