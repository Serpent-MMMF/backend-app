import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDetailCity = async (req: Request, res: Response) => {
  try {
    res.send("Not implemented");
  } catch (err) {
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
    body: {
      content: {},
      required: true,
      description: "Create group-session request body",
    },
  },
  responses: {
    200: {
      description: "Create group-session success response",
      content: {},
    },
  },
};
