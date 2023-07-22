import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";

export const DiscussionDTO = zoa.object({
  id: zoa.string().openapi({ description: "User ID", example: "1" }),
  createdAt: zoa.coerce.date().openapi({
    description: "user's created at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  updatedAt: zoa.coerce.date().openapi({
    description: "user's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  userId: zoa.string().openapi({
    description: "user's id",
    example: "John Doe",
  }),
  sessionId: zoa.string().openapi({
    description: "session's id",
    example: "johndoe",
  }),
  content: zoa.string().openapi({
    description: "content discussion",
    example: "this is content discussion",
  }),
});
export type IDiscussionDTO = z.infer<typeof DiscussionDTO>;

export const ReqCreateDiscussion = zoa.object({
  sessionId: zoa.string().openapi({
    description: "session's id",
    example: "1",
  }),
  content: zoa.string().openapi({
    description: "content discussion",
    example: "this is content discussion",
  }),
});
export type IReqCreateDiscussion = z.infer<typeof ReqCreateDiscussion>;

export const RespCreateDiscussion = BaseResponse.merge(
  zoa
    .object({
      data: DiscussionDTO.optional(),
    })
    .openapi({ description: "create discussion response data" })
).openapi({ description: "create discussion response" });
export type IRespCreateDiscussion = z.infer<typeof RespCreateDiscussion>;

export const QueryGetDiscussion = zoa.object({
  sessionId: zoa.string().optional().openapi({
    description: "session's id",
    example: "1",
  }),
  userId: zoa.string().optional().openapi({
    description: "user's id",
    example: "1",
  }),
});
export type IQueryGetDiscussion = z.infer<typeof QueryGetDiscussion>;

export const RespGetDiscussionData = zoa.array(DiscussionDTO).openapi({
  description: "Discussion response data",
});

export const RespGetDiscussion = BaseResponse.merge(
  zoa
    .object({
      data: RespGetDiscussionData.optional(),
    })
    .openapi({ description: "Get discussion response data" })
).openapi({ description: "Get discussion response" });
export type IRespGetDiscussion = z.infer<typeof RespGetDiscussion>;
