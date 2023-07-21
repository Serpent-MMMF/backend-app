import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";

export const GroupSessionDTO = zoa.object({
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
    description: "group discussion title",
    example: "John Doe Group Session",
  }),
  date: zoa.coerce.date().openapi({
    description: "user's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  meetingUrl: zoa.string().openapi({
    description: "meeting url",
    example: "https://meet.google.com/123",
  }),
  mentorId: zoa.string().openapi({
    description: "mentor's id",
    example: "1",
  }),
  description: zoa.string().openapi({
    description: "group discussion description",
    example: "This is a group discussion",
  }),
  maxParticipant: zoa.number().openapi({
    description: "maximum number of participants",
    example: 10,
  }),
});
export type IGroupSessionDTO = z.infer<typeof GroupSessionDTO>;

export const ReqCreateGroupSession = zoa.object({
  name: zoa.string().openapi({
    description: "group discussion title",
    example: "John Doe Group Session",
  }),
  date: zoa.coerce.date().openapi({
    description: "group session date time",
    example: "2021-08-01T00:00:00.000Z",
  }),
  meetingUrl: zoa.string().openapi({
    description: "meeting url",
    example: "https://meet.google.com/123",
  }),
  description: zoa.string().openapi({
    description: "group discussion description",
    example: "This is a group discussion",
  }),
  maxParticipant: zoa.number().openapi({
    description: "maximum number of participants",
    example: 10,
  }),
});
export type IReqCreateGroupSession = z.infer<typeof ReqCreateGroupSession>;

export const RespCreateGroupSession = BaseResponse.merge(
  zoa
    .object({
      data: GroupSessionDTO.optional(),
    })
    .openapi({
      description: "create group session data",
    })
).openapi({ description: "create group session response" });
export type IRespCreateGroupSession = z.infer<typeof RespCreateGroupSession>;

export const QueryGetGroupSession = zoa.object({
  mentorId: zoa.string().optional().openapi({
    description: "mentor's id",
    example: "1",
  }),
  limitStartDateTime: zoa.coerce.date().optional().openapi({
    description: "limit start date time", // idk needed or not
    example: "2021-08-01T00:00:00.000Z",
  }),
  limitEndDateTime: zoa.coerce.date().optional().openapi({
    description: "limit end date time",
    example: "2021-08-01T00:00:00.000Z",
  }),
});
export type IQueryGetGroupSession = z.infer<typeof QueryGetGroupSession>;

export const RespGetGroupSession = BaseResponse.merge(
  zoa
    .object({
      data: zoa.array(GroupSessionDTO).optional(),
    })
    .openapi({
      description: "Get group session data",
    })
).openapi({ description: "Get group session response" });
export type IRespGetGroupSession = z.infer<typeof RespGetGroupSession>;

export const ReqGetDetailGroupSession = zoa.object({
  id: zoa.string().openapi({
    description: "group session ID",
    example: "1",
  }),
});
export type IReqGetDetailGroupSession = z.infer<
  typeof ReqGetDetailGroupSession
>;

export const RespGetDetailGroupSession = BaseResponse.merge(
  zoa
    .object({
      data: GroupSessionDTO.optional(),
    })
    .openapi({
      description: "Get detail group session data",
    })
).openapi({ description: "Get detail group session response" });
export type IRespGetDetailGroupSession = z.infer<
  typeof RespGetDetailGroupSession
>;
