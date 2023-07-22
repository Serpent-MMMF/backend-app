import { Request, Response } from "express";
import {
  IRespCreateOneOnOne,
  QueryGetDiscussion,
  ReqCreateDiscussion,
  ReqCreateOneOnOne,
  RespCreateDiscussion,
  RespCreateOneOnOne,
  RespSearchUser,
  buildErr,
} from "../../contract";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { authMiddleware } from "../../middleware/auth";
import { zoa } from "../../util";
import { ITokenContent } from "../../internal";
import { HttpStatusCode } from "../../constant";
import { oneOnOneUsecase } from "../../usecase/one-on-one";
import { menteeCheckMiddleware } from "../../middleware";

export const createOneOnOne = async (req: Request, res: Response) => {
  try {
    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const response: IRespCreateOneOnOne = {
        success: false,
        message: "Token not found",
        error: "Token not found",
      };
      return res.status(HttpStatusCode.Unauthorized.code).json(response);
    }

    const reqBody = ReqCreateOneOnOne.safeParse(req.body);
    if (!reqBody.success) {
      const response: IRespCreateOneOnOne = {
        success: false,
        message: "Request body is invalid",
        error: reqBody.error.message,
      };
      return res.status(HttpStatusCode.BadRequest.code).json(response);
    }

    const oneOnOne = await oneOnOneUsecase.create(
      reqBody.data,
      tokenContent.id
    );

    const response: IRespCreateOneOnOne = {
      success: true,
      message: "Create one on one success",
      data: oneOnOne,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const createOneOnOneHandler: IHandler = {
  path: ENDPOINTS.ONE_ON_ONE.CREATE_ONE_ON_ONE.path,
  method: ENDPOINTS.ONE_ON_ONE.CREATE_ONE_ON_ONE.method,
  handler: createOneOnOne,
  middlewares: [authMiddleware,menteeCheckMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqCreateOneOnOne,
        },
      },
      required: true,
      description: "create one on one request body",
    },
  },
  responses: {
    200: {
      description: "Create one on one success response",
      content: {
        "application/json": {
          schema: RespCreateOneOnOne,
        },
      },
    },
  },
};
