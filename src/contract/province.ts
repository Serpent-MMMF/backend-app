import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";

export const ProvinceDTO = zoa.object({
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
    description: "province name",
    example: "DKI Jakarta",
  }),
});
export type IProvinceDTO = z.infer<typeof ProvinceDTO>;

export const RespGetProvince = BaseResponse.merge(
  zoa
    .object({
      data: zoa.array(ProvinceDTO).optional(),
    })
    .openapi({ description: "get province response data" })
).openapi({ description: "get province response" });
export type IRespGetProvince = z.infer<typeof RespGetProvince>;

export const ParamsGetDetailProvince = zoa.object({
  id: zoa.string().openapi({
    description: "province id",
    example: "1",
  }),
});
export type IParamsGetDetailProvince = z.infer<typeof ParamsGetDetailProvince>;

export const RespGetDetailProvince = BaseResponse.merge(
  zoa
    .object({
      data: ProvinceDTO.optional(),
    })
    .openapi({ description: "get detail province response data" })
).openapi({ description: "get detail province response" });

export type IRespGetDetailProvince = z.infer<typeof RespGetDetailProvince>;
