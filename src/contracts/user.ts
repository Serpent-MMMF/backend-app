import { Role, SubscriptionStatus } from "@prisma/client";
import { zoa } from "../util";

export const UserDTO = zoa.object({
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
