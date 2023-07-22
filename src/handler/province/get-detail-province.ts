import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IParamsIdProvince,
  IRespGetDetailProvince,
  ParamsIdProvince,
  RespGetDetailProvince,
  buildErr,
} from "../../contract";
import { provinceUsecase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDetailProvince = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as IParamsIdProvince;

    const province = await provinceUsecase.findById(id);
    if (!province) {
      const response: IRespGetDetailProvince = {
        success: false,
        message: "Province not found",
      };
      return res.status(404).json(response);
    }

    const response: IRespGetDetailProvince = {
      success: true,
      message: "Get detail province success",
      data: province,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getDetailProvinceHandler: IHandler = {
  path: ENDPOINTS.PROVINCE.GET_DETAIL_PROVINCE.path,
  method: ENDPOINTS.PROVINCE.GET_DETAIL_PROVINCE.method,
  handler: getDetailProvince,
  middlewares: [],
  request: {
    params: ParamsIdProvince,
  },
  responses: {
    200: {
      description: "Get detail province success response",
      content: {
        "application/json": {
          schema: RespGetDetailProvince,
        },
      },
    },
  },
};
