import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";

export const TagDTO = zoa.object({
  id: zoa.string().openapi({ description: "User ID", example: "1" }),
  createdAt: zoa.coerce.date().openapi({
    description: "user's created at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  updatedAt: zoa.coerce.date().openapi({
    description: "user's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  name: zoa.string().openapi({
    description: "tag name",
    example: "Software Engineering",
  }),
});
export type ITagDTO = z.infer<typeof TagDTO>;

export const UserTagDTO = zoa.object({
  id: zoa.string().openapi({ description: "User ID", example: "1" }),
  createdAt: zoa.coerce.date().openapi({
    description: "user tag's created at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  updatedAt: zoa.coerce.date().openapi({
    description: "user tag's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  userId: zoa.string().openapi({
    description: "user's id",
    example: "1",
  }),
  tagId: zoa.string().openapi({
    description: "tag's id",
    example: "1",
  }),
});
export type IUserTagDTO = z.infer<typeof UserTagDTO>;

export const UserTagDetailDTO = UserTagDTO.merge(
  zoa
    .object({
      tag: TagDTO.or(zoa.null()).openapi({
        description: "tag detail",
      }),
    })
    .openapi({ description: "user tag detail" })
);
export type IUserTagDetailDTO = z.infer<typeof UserTagDetailDTO>;

export const QueryGetTag = zoa.object({
  userId: zoa.string().optional().openapi({
    description: "user's id",
    example: "1",
  }),
});
export type IQueryGetTag = z.infer<typeof QueryGetTag>;

export const TagNameDTO = zoa.object({
  name: zoa.string(),
});
export type ITagNameDTO = z.infer<typeof TagNameDTO>;

export const RespGetTagList = BaseResponse.merge(
  zoa
    .object({
      data: zoa.array(TagDTO).optional(),
    })
    .openapi({ description: "get tag list response data" })
).openapi({ description: "get tag list response" });
export type IRespGetTagList = z.infer<typeof RespGetTagList>;

export const RespGetTag = BaseResponse.merge(
  zoa
    .object({
      data: zoa.array(UserTagDetailDTO).optional(),
    })
    .openapi({ description: "get tag response data" })
).openapi({ description: "get tag response" });
export type IRespGetTag = z.infer<typeof RespGetTag>;
