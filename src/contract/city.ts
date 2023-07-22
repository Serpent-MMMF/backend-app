import { z } from "zod";
import { zoa } from "../util";
import { BaseResponse } from "./base";

export const CityDTO = zoa.object({
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
    description: "city's name",
    example: "Jakarta",
  }),
  provinceId: zoa.string().openapi({
    description: "province's id",
    example: "1",
  }),
});
export type ICityDTO = z.infer<typeof CityDTO>;

export const QueryGetCity = zoa.object({
  provinceId: zoa.string().optional().openapi({
    description: "province's id",
    example: "1",
  }),
});
export type IQueryGetCity = z.infer<typeof QueryGetCity>;

export const RespGetCity = BaseResponse.merge(
  zoa
    .object({
      data: zoa.array(CityDTO).optional(),
    })
    .openapi({ description: "Get city response data" })
).openapi({ description: "Get city response" });
export type IRespGetCity = z.infer<typeof RespGetCity>;

export const ParamsIdCity = zoa.object({
  id: zoa.string().openapi({
    description: "city id",
    example: "1",
  }),
});
export type IParamsIdCity = z.infer<typeof ParamsIdCity>;

export const RespGetDetailCity = BaseResponse.merge(
  zoa
    .object({
      data: CityDTO.optional(),
    })
    .openapi({ description: "Get detail city response data" })
).openapi({ description: "Get detail city response" });

export type IRespGetDetailCity = z.infer<typeof RespGetDetailCity>;
