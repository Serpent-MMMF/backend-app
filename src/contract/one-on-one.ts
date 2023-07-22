import { z } from "zod";
import { zoa } from "../util";
import { ApprovalStatus } from "@prisma/client";
import { BaseResponse } from "./base";

export const OneOnOneDTO = zoa.object({
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
  mentorId: zoa.string().openapi({
    description: "mentor's id",
    example: "1",
  }),
  meetingUrl: zoa
    .string()
    .openapi({
      description: "meeting url",
      example: "https://meet.google.com/123",
    })
    .or(zoa.null()),
  review: zoa
    .string()
    .openapi({
      description: "review content",
      example: "this is review content",
    })
    .or(zoa.null()),
  rating: zoa
    .number()
    .openapi({
      description: "rating",
      example: 4,
    })
    .or(zoa.null()),
  message: zoa.string().openapi({
    description: "message",
    example: "message request",
  }),
  approvalStatus: zoa
    .enum([
      ApprovalStatus.APPROVED,
      ApprovalStatus.PENDING,
      ApprovalStatus.REJECTED,
    ])
    .openapi({
      description: "approval status",
      example: ApprovalStatus.APPROVED,
    }),
  date: zoa.coerce.date().openapi({
    description: "user's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
});
export type IOneOnOneDTO = z.infer<typeof OneOnOneDTO>;

export const ReqCreateOneOnOne = zoa.object({
  mentorId: zoa.string().openapi({
    description: "mentor's id",
    example: "1",
  }),
  message: zoa.string().openapi({
    description: "message",
    example: "message request",
  }),
  date: zoa.coerce.date().openapi({
    description: "user's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
});
export type IReqCreateOneOnOne = z.infer<typeof ReqCreateOneOnOne>;

export const RespCreateOneOnOne = BaseResponse.merge(
  zoa
    .object({
      data: OneOnOneDTO.optional(),
    })
    .openapi({ description: "create one on one response data" })
).openapi({ description: "create one on one response" });
export type IRespCreateOneOnOne = z.infer<typeof RespCreateOneOnOne>;

export const QueryGetOneOnOne = zoa.object({
  mentorId: zoa.string().optional().openapi({
    description: "mentor's id",
    example: "1",
  }),
  menteeId: zoa.string().optional().openapi({
    description: "mentee's id",
    example: "1",
  }),
  approvalStatus: zoa
    .enum([
      ApprovalStatus.APPROVED,
      ApprovalStatus.PENDING,
      ApprovalStatus.REJECTED,
    ])
    .optional()
    .openapi({
      description: "approval status",
      example: ApprovalStatus.APPROVED,
    }),
});
export type IQueryGetOneOnOne = z.infer<typeof QueryGetOneOnOne>;

export const RespGetOneOnOneData = zoa.array(OneOnOneDTO).openapi({
  description: "get one on one response data",
});

export const RespGetOneOnOne = BaseResponse.merge(
  zoa
    .object({
      data: RespGetOneOnOneData.optional(),
    })
    .openapi({ description: "get one on one response data" })
).openapi({ description: "get one on one response" });
export type IRespGetOneOnOne = z.infer<typeof RespGetOneOnOne>;

export const RespGetDetailOneOnOne = BaseResponse.merge(
  zoa
    .object({
      data: OneOnOneDTO.optional(),
    })
    .openapi({ description: "get detail one on one response data" })
).openapi({ description: "get detail one on one response" });
export type IRespGetDetailOneOnOne = z.infer<typeof RespGetDetailOneOnOne>;

export const ReqApproveOneOnOne = zoa.object({
  meetingUrl: zoa.string().openapi({
    description: "meeting url",
    example: "https://meet.google.com/123",
  }),
});
export type IReqApproveOneOnOne = z.infer<typeof ReqApproveOneOnOne>;

export const ReqAddReviewRating = zoa.object({
  review: zoa.string().openapi({
    description: "review content",
    example: "this is review content",
  }),
  rating: zoa.number().openapi({
    description: "rating",
    example: 4,
  }),
});
export type IReqAddReviewRating = z.infer<typeof ReqAddReviewRating>;

export const RespUpdateOneOnOne = BaseResponse.merge(
  zoa
    .object({
      data: OneOnOneDTO.optional(),
    })
    .openapi({ description: "update status one on one response data" })
).openapi({ description: "update status one on one response" });
export type IRespUpdateOneOnOne = z.infer<typeof RespUpdateOneOnOne>;
