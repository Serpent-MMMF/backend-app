import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IParamsIdCity,
  IRespGetDetailCity,
  ParamsIdCity,
  RespGetDetailCity,
  buildErr,
} from "../../contract";
import { cityUsecase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDetailCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as IParamsIdCity;

    const city = await cityUsecase.findById(id);
    if (!city) {
      const response: IRespGetDetailCity = {
        success: false,
        message: "City not found",
      };
      return res.status(404).json(response);
    }

    const response: IRespGetDetailCity = {
      success: true,
      message: "Get detail city success",
      data: city,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getDetailCityHandler: IHandler = {
  path: ENDPOINTS.CITY.GET_DETAIL_CITY.path,
  method: ENDPOINTS.CITY.GET_DETAIL_CITY.method,
  handler: getDetailCity,
  middlewares: [],
  request: {
    params: ParamsIdCity,
  },
  responses: {
    200: {
      description: "Get detail city success response",
      content: {
        "application/json": {
          schema: RespGetDetailCity,
        },
      },
    },
  },
};
