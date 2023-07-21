import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  buildErr,
  IQueryGetTag,
  IRespGetTag,
  QueryGetTag,
  RespGetTag,
} from "../../contract";
import { tagUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

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
      description: "Get tag success response",
      content: {
        "application/json": {
          schema: RespGetTag,
        },
      },
    },
  },
};
