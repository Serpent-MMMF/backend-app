import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDetailProvince = async (req: Request, res: Response) => {
  try {
    res.send("Not implemented");
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
