import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import { buildErr } from "../../contract/base";
import { IRespGetProvince, RespGetProvince } from "../../contract/province";
import { provinceUsecase } from "../../usecase/province";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getProvince = async (req: Request, res: Response) => {
  try {
    const provinces = await provinceUsecase.findMany();

    const response: IRespGetProvince = {
      success: true,
      message: "Get province success",
      data: provinces,
    };

    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getProvinceHandler: IHandler = {
  path: ENDPOINTS.PROVINCE.GET_PROVINCE.path,
  method: ENDPOINTS.PROVINCE.GET_PROVINCE.method,
  handler: getProvince,
  middlewares: [],
  request: {},
  responses: {
    200: {
      description: "Get province success response",
      content: {
        "application/json": {
          schema: RespGetProvince,
        },
      },
    },
  },
};
