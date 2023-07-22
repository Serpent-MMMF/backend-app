import { Role, SubscriptionStatus } from "@prisma/client";
import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";

export const UserDTO = zoa.object({
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
    description: "user's name",
    example: "malik akbar",
  }),
  description: zoa.string().openapi({
    description: "user's description",
    example: "I am a cool guys",
  }),
  role: zoa.enum([Role.MENTEE, Role.MENTOR]).openapi({
    description: "user's role",
    example: Role.MENTEE,
  }),
  email: zoa.string().openapi({
    description: "user's email",
    example: "user@gmail.com",
  }),
  cityId: zoa.string().openapi({
    description: "user's city'",
    example: "1101",
  }),
  imageUrl: zoa.string().or(zoa.null()).openapi({
    description: "user's image url",
    example: "http://www.example.com",
  }),
  subscriptionStatus: zoa
    .enum([SubscriptionStatus.FREE, SubscriptionStatus.PREMIUM])
    .openapi({
      description: "user subscription status",
      example: SubscriptionStatus.FREE,
    }),
});
export type IUserDTO = z.infer<typeof UserDTO>;

export const QuerySearchUser = zoa.object({
  role: zoa.enum([Role.MENTOR, Role.MENTEE]).optional().openapi({
    description: "user's role",
    example: Role.MENTOR,
  }),
  tagIds: zoa.string().optional().openapi({
    description: "comma separated values",
    example: "1,2,3",
  }),
  onMyCity: zoa.boolean().optional().openapi({
    description: "user on my city",
    example: true,
  }),
  onMyProvince: zoa.boolean().optional().openapi({
    description: "user on my province",
    example: true,
  }),
  premiumOnly: zoa.boolean().optional().openapi({
    description: "user premium only",
    example: true,
  }),
});
export type IQuerySearchUser = z.infer<typeof QuerySearchUser>;

export const RespSearchUserData = zoa.array(UserDTO).openapi({
  description: "Search user response data",
});

export const RespSearchUser = BaseResponse.merge(
  zoa
    .object({
      data: RespSearchUserData.optional(),
    })
    .openapi({ description: "Search user response data" })
).openapi({ description: "Search user response" });
export type IRespSearchUser = z.infer<typeof RespSearchUser>;

export const RespSelfProfile = BaseResponse.merge(
  zoa
    .object({
      data: UserDTO.optional(),
    })
    .openapi({ description: "Profile response data" })
).openapi({ description: "Profile response" });
export type IRespSelfProfile = z.infer<typeof RespSelfProfile>;

export const ParamsIdProfile = zoa.object({
  id: zoa.string().openapi({
    description: "user's id",
    example: "1",
  }),
});

export type IParamsIdProfile = z.infer<typeof ParamsIdProfile>;

export const RespGetProfile = BaseResponse.merge(
  zoa
    .object({
      data: UserDTO.optional(),
    })
    .openapi({ description: "Profile response data" })
).openapi({ description: "Profile response" });
export type IRespGetProfile = z.infer<typeof RespGetProfile>;

export const ReqUpdateProfile = zoa.object({
  name: zoa.string().openapi({
    description: "user's name",
    example: "John Doe",
  }),
  description: zoa.string().openapi({
    description: "user's description",
    example: "I am a mentor",
  }),
  subscriptionStatus: zoa.string().openapi({
    description: "user's subscription status",
    example: "FREE",
  }),
  imageUrl: zoa.string().openapi({
    description: "user's image url",
    example: "https://i.imgur.com/123.jpg",
  }),
  cityId: zoa.string().openapi({
    description: "user's city id",
    example: "1101",
  }),
  tagIds: zoa.string().openapi({
    description: "comma separated values",
    example: "1,2,3",
  }),
});
export type IReqUpdateProfile = z.infer<typeof ReqUpdateProfile>;

export const RespUpdateProfile = BaseResponse.merge(
  zoa
    .object({
      data: UserDTO.optional(),
    })
    .openapi({ description: "Update profile response data" })
).openapi({ description: "Update profile response" });
export type IRespUpdateProfile = z.infer<typeof RespUpdateProfile>;
