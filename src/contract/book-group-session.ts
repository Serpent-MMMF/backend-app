import { z } from "zod";
import { Prettify, zoa } from "../util";
import { BaseResponse } from "./base";

export const BookGroupSessionDTO = zoa.object({
  id: zoa.string().openapi({ description: "User ID", example: "1" }),
  createdAt: zoa.coerce.date().openapi({
    description: "user's created at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  updatedAt: zoa.coerce.date().openapi({
    description: "user's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  menteeId: zoa.string().openapi({
    description: "mentee's id",
    example: "1",
  }),
  sessionId: zoa.string().openapi({
    description: "session's id",
    example: "1",
  }),
});
export type IBookGroupSessionDTO = z.infer<typeof BookGroupSessionDTO>;

export const ReqCreateBookGroupSession = zoa.object({
  sessionId: zoa.string().openapi({
    description: "session's id",
    example: "1",
  }),
});
export type IReqCreateBookGroupSession = z.infer<
  typeof ReqCreateBookGroupSession
>;

export const RespCreateBookGroupSession = BaseResponse.merge(
  zoa
    .object({
      data: BookGroupSessionDTO.optional(),
    })
    .openapi({ description: "Create book group session response data" })
).openapi({ description: "Create book group session response" });
export type IRespCreateBookGroupSession = z.infer<
  typeof RespCreateBookGroupSession
>;

export const QueryGetBookGroupSession = zoa.object({
  sessionId: zoa.string().optional().openapi({
    description: "session's id",
    example: "1",
  }),
  menteeId: zoa.string().optional().openapi({
    description: "mentee's id",
    example: "1",
  }),
});
export type IQueryGetBookGroupSession = z.infer<
  typeof QueryGetBookGroupSession
>;

export const RespGetBookGroupSession = BaseResponse.merge(
  zoa
    .object({
      data: zoa.array(BookGroupSessionDTO).optional(),
    })
    .openapi({ description: "Get book group session response data" })
).openapi({ description: "Get book group session response" });
export type IRespGetBookGroupSession = z.infer<typeof RespGetBookGroupSession>;

export const ParamsIdBookGroupSession = zoa.object({
  id: zoa.string().openapi({
    description: "book group session ID",
    example: "1",
  }),
});
export type IParamsIdBookGroupSession = z.infer<
  typeof ParamsIdBookGroupSession
>;

export const RespGetDetailBookGroupSession = BaseResponse.merge(
  zoa
    .object({
      data: BookGroupSessionDTO.optional(),
    })
    .openapi({ description: "Get detail book group session response data" })
).openapi({ description: "Get detail book group session response" });
export type IRespGetDetailBookGroupSession = Prettify<z.infer<
  typeof RespGetDetailBookGroupSession
>>;
