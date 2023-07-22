import { Request, Response } from "express";
import {
  IRespUpdateOneOnOne,
  QueryGetDiscussion,
  ReqAddReviewRating,
  ReqCreateDiscussion,
  ReqCreateOneOnOne,
  RespCreateDiscussion,
  RespCreateOneOnOne,
  RespGetDetailOneOnOne,
  RespGetOneOnOne,
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
import { menteeCheckMiddleware } from "../../middleware";

export const addReviewRating = async (req: Request, res: Response) => {
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

    const reqBody = ReqAddReviewRating.safeParse(req.body);
    if (!reqBody.success) {
      const response: IRespUpdateOneOnOne = {
        success: false,
        message: "Request body is invalid",
        error: reqBody.error.message,
      };
      return res.status(HttpStatusCode.BadRequest.code).json(response);
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

    const oneOnOne = await oneOnOneUsecase.addReviewRating(
      reqBody.data,
      oneOnOneId,
      tokenContent.id
    );

    const response: IRespUpdateOneOnOne = {
      success: true,
      message: "Add review rating one on one success",
      data: oneOnOne,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const addReviewRatingHandler: IHandler = {
  path: ENDPOINTS.ONE_ON_ONE.ADD_RATING_REVIEW_ONE_ON_ONE.path,
  method: ENDPOINTS.ONE_ON_ONE.ADD_RATING_REVIEW_ONE_ON_ONE.method,
  handler: addReviewRating,
  middlewares: [authMiddleware, menteeCheckMiddleware],
  request: {
    params: zoa.object({
      id: zoa.string().openapi({
        description: "One on one ID",
        example: "1",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: ReqAddReviewRating,
        },
      },
      required: true,
      description: "add review rating one on one request body",
    },
  },
  responses: {
    200: {
      description: "add review rating one on one success response",
      content: {
        "application/json": {
          schema: RespUpdateOneOnOne,
        },
      },
    },
  },
};
