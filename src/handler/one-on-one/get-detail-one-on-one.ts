import { Request, Response } from "express";
import {
  IRespGetDetailOneOnOne,
  QueryGetDiscussion,
  ReqCreateDiscussion,
  ReqCreateOneOnOne,
  RespCreateDiscussion,
  RespCreateOneOnOne,
  RespGetDetailOneOnOne,
  RespGetOneOnOne,
  RespSearchUser,
  buildErr,
} from "../../contract";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { authMiddleware } from "../../middleware/auth";
import { zoa } from "../../util";
import { HttpStatusCode } from "../../constant";
import { oneOnOneUsecase } from "../../usecase/one-on-one";

export const getDetailOneOnOne = async (req: Request, res: Response) => {
  try {
    const oneOnOneId = req.params.id;
    if (!oneOnOneId) {
      const response: IRespGetDetailOneOnOne = {
        success: false,
        message: "One on one id is required",
        error: "One on one id is required",
      };
      return res.status(HttpStatusCode.BadRequest.code).json(response);
    }

    const oneOnOne = await oneOnOneUsecase.findById(oneOnOneId);
    if (!oneOnOne) {
      const response: IRespGetDetailOneOnOne = {
        success: false,
        message: "One on one not found",
        error: "One on one not found",
      };
      return res.status(HttpStatusCode.NotFound.code).json(response);
    }

    const response: IRespGetDetailOneOnOne = {
      success: true,
      message: "Get detail one on one success",
      data: oneOnOne,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getDetailOneOnOneHandler: IHandler = {
  path: ENDPOINTS.ONE_ON_ONE.GET_DETAIL_ONE_ON_ONE.path,
  method: ENDPOINTS.ONE_ON_ONE.GET_DETAIL_ONE_ON_ONE.method,
  handler: getDetailOneOnOne,
  middlewares: [authMiddleware],
  request: {
    params: zoa.object({
      id: zoa.string().openapi({
        description: "One on one ID",
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "get detail one on one success response",
      content: {
        "application/json": {
          schema: RespGetDetailOneOnOne,
        },
      },
    },
  },
};
