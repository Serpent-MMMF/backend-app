import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IQueryGetDiscussion,
  IRespGetDiscussion,
  QueryGetDiscussion,
  RespGetDiscussion,
  buildErr,
} from "../../contract";
import { discussionUseCase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDiscussion = async (req: Request, res: Response) => {
  try {
    const sessionId = req.query.sessionId;
    const userId = req.query.userId;
    const query: IQueryGetDiscussion = {
      sessionId: typeof sessionId === "string" ? sessionId : undefined,
      userId: typeof userId === "string" ? userId : undefined,
    };

    const discussions = await discussionUseCase.query(
      query.sessionId,
      query.userId
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
