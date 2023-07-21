import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import {
  IQueryGetCity,
  IRespGetCity,
  QueryGetCity,
  RespGetCity,
} from "../../contract/city";
import { cityUsecase } from "../../usecase/city";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getCity = async (req: Request, res: Response) => {
  try {
    const reqQuery: IQueryGetCity = QueryGetCity.parse(req.query);

    const cities = await cityUsecase.findMany(reqQuery);

    const response: IRespGetCity = {
      success: true,
      message: "Get cities success",
      data: cities,
    };
    return res.status(200).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getCityHandler: IHandler = {
  path: ENDPOINTS.CITY.GET_CITY.path,
  method: ENDPOINTS.CITY.GET_CITY.method,
  handler: getCity,
  middlewares: [],
  request: {
    query: QueryGetCity,
  },
  responses: {
    200: {
      description: "Get city success response",
      content: {
        "application/json": {
          schema: RespGetCity,
        },
      },
    },
  },
};
