import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IRespCreateDiscussion,
  ReqCreateDiscussion,
  RespCreateDiscussion,
  buildErr,
} from "../../contract";
import { authMiddleware } from "../../middleware/auth";
import { discussionUseCase } from "../../usecase/discussion";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const createDiscussion = async (req: Request, res: Response) => {
  try {
    const reqBody = ReqCreateDiscussion.safeParse(req.body);

    if (!reqBody.success) {
      const response: IRespCreateDiscussion = {
        success: false,
        message: "Invalid request body",
        error: reqBody.error.message,
      };
      return res.status(HttpStatusCode.Forbidden.code).json(response);
    }

    const user = res.locals.tokenContent;
    const discussion = await discussionUseCase.create(
      user.id,
      user.role,
      reqBody.data
    );

    const response: IRespCreateDiscussion = {
      success: true,
      message: "Create discussion success",
      data: discussion,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const createDiscussionHandler: IHandler = {
  path: ENDPOINTS.DISCUSSION.CREATE_DISCUSSION.path,
  method: ENDPOINTS.DISCUSSION.CREATE_DISCUSSION.method,
  handler: createDiscussion,
  middlewares: [authMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqCreateDiscussion,
        },
      },
      required: true,
      description: "Create discussion request body",
    },
  },
  responses: {
    200: {
      description: "Create discussion success response",
      content: {
        "application/json": {
          schema: RespCreateDiscussion,
        },
      },
    },
  },
};
