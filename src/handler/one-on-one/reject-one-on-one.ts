import { Request, Response } from "express";
import {
  IRespUpdateOneOnOne,
  QueryGetDiscussion,
  ReqApproveOneOnOne,
  ReqCreateDiscussion,
  ReqCreateOneOnOne,
  RespCreateDiscussion,
  RespCreateOneOnOne,
  RespSearchUser,
  RespUpdateOneOnOne,
  buildErr,
} from "../../contract";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { authMiddleware } from "../../middleware/auth";
import { zoa } from "../../util";
import { ITokenContent } from "../../internal";
import { HttpStatusCode } from "../../constant";
import { oneOnOneUsecase } from "../../usecase/one-on-one";
import { mentorCheckMiddleware } from "../../middleware";

export const rejectOneOnOne = async (req: Request, res: Response) => {
  try {
    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const response: IRespUpdateOneOnOne = {
        success: false,
        message: "Token not found",
        error: "Token not found",
      };
      return res.status(HttpStatusCode.Unauthorized.code).json(response);
    }

    const oneOnOneId = req.params.id;
    if (!oneOnOneId) {
      const response: IRespUpdateOneOnOne = {
        success: false,
        message: "one on one id is required",
        error: "one on one id is required",
      };
      return res.status(HttpStatusCode.BadRequest.code).json(response);
    }

    const oneOnOne = await oneOnOneUsecase.reject(oneOnOneId, tokenContent.id);
    const response: IRespUpdateOneOnOne = {
      success: true,
      message: "reject one on one success",
      data: oneOnOne,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const rejectOneOnOneHandler: IHandler = {
  path: ENDPOINTS.ONE_ON_ONE.REJECT_ONE_ON_ONE.path,
  method: ENDPOINTS.ONE_ON_ONE.REJECT_ONE_ON_ONE.method,
  handler: rejectOneOnOne,
  middlewares: [authMiddleware, mentorCheckMiddleware],
  request: {
    params: zoa.object({
      id: zoa.string().openapi({
        description: "one on one id",
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "reject one on one success response",
      content: {
        "application/json": {
          schema: RespUpdateOneOnOne,
        },
      },
    },
  },
};
