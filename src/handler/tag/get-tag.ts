import { Request, Response } from "express";
import {
  IQueryGetTag,
  IRespGetTag,
  QueryGetTag,
  RespGetTag,
  buildErr,
} from "../../contract";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { zoa } from "../../util";
import { tagUsecase } from "../../usecase";
import { HttpStatusCode } from "../../constant";

export const getTag = async (req: Request, res: Response) => {
  try {
    const query: IQueryGetTag = req.query;
    const tags = await tagUsecase.findUserTags(query);

    const response: IRespGetTag = {
      success: true,
      message: "Get tag success",
      data: tags,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getTagHandler: IHandler = {
  path: ENDPOINTS.TAG.GET_TAG.path,
  method: ENDPOINTS.TAG.GET_TAG.method,
  handler: getTag,
  middlewares: [],
  request: {
    query: QueryGetTag,
  },
  responses: {
    200: {
      description: "get tag success response",
      content: {
        "application/json": {
          schema: RespGetTag,
        },
      },
    },
  },
};
