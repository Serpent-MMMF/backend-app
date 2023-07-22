import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IRespGetDiscussion,
  QueryGetDiscussion,
  RespGetDiscussion,
  buildErr,
} from "../../contract";
import { discussionUseCase } from "../../usecase/discussion";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDiscussion = async (req: Request, res: Response) => {
  try {
    const query = QueryGetDiscussion.safeParse(req.query);

    if (!query.success) {
      const response: IRespGetDiscussion = {
        success: false,
        message: "Invalid request query",
        error: query.error.message,
      };
      return res.status(HttpStatusCode.Forbidden.code).json(response);
    }

    const discussions = await discussionUseCase.query(
      query.data.sessionId,
      query.data.userId
    );

    const response: IRespGetDiscussion = {
      success: true,
      message: "Get discussion success",
      data: discussions,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getDiscussionHandler: IHandler = {
  path: ENDPOINTS.DISCUSSION.GET_DISCUSSION.path,
  method: ENDPOINTS.DISCUSSION.GET_DISCUSSION.method,
  handler: getDiscussion,
  middlewares: [],
  request: {
    query: QueryGetDiscussion,
  },
  responses: {
    200: {
      description: "Get discussion success response",
      content: {
        "application/json": {
          schema: RespGetDiscussion,
        },
      },
    },
  },
};
