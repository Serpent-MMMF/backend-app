import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";
import { UserDTO } from "./user";
import { Role } from "@prisma/client";

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

export const ReqRegister = zoa.object({
  name: zoa.string().openapi({ description: "Name", example: "John Doe" }),
  description: zoa.string().openapi({
    description: "Description",
    example: "I'm a cool guy",
  }),
  role: zoa.enum([Role.MENTOR, Role.MENTEE]).openapi({
    description: "user's role",
    example: Role.MENTEE,
  }),
  email: zoa
    .string()
    .openapi({ description: "Email", example: "johndoe@gmail" }),
  password: zoa
    .string()
    .openapi({ description: "Password", example: "123mazk;" }),
  cityId: zoa.string().openapi({
    description: "City ID",
    example: "1101",
  }),
  tagIds: zoa.string().openapi({
    description: "Tag IDs",
    example: "1,2,3",
  }),
});
export type IReqRegister = z.infer<typeof ReqRegister>;

export const RegisterData = UserDTO;

export const RespRegister = BaseResponse.merge(
  zoa.object({
    data: RegisterData.optional(),
  })
);
export type IRespRegister = z.infer<typeof RespRegister>;
