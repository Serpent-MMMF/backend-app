import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IRespCreateGroupSession,
  ReqCreateGroupSession,
  RespCreateGroupSession,
  buildErr,
} from "../../contract";
import { authMiddleware, mentorCheckMiddleware } from "../../middleware";
import { groupSessionUseCase } from "../../usecase/group-session";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const createGroupSession = async (req: Request, res: Response) => {
  try {
    const reqBody = ReqCreateGroupSession.safeParse(req.body);

    if (!reqBody.success) {
      const response: IRespCreateGroupSession = {
        success: false,
        message: "Invalid request body",
        error: reqBody.error.message,
      };
      return res.status(400).json(response);
    }

    const user = res.locals.tokenContent;
    const groupSession = await groupSessionUseCase.create(
      user.id,
      reqBody.data
    );

    const response: IRespCreateGroupSession = {
      success: true,
      message: "Create group session success",
      data: groupSession,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const createGroupSessionHandler: IHandler = {
  path: ENDPOINTS.GROUP_SESSION.CREATE_GROUP_SESSION.path,
  method: ENDPOINTS.GROUP_SESSION.CREATE_GROUP_SESSION.method,
  handler: createGroupSession,
  middlewares: [authMiddleware, mentorCheckMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqCreateGroupSession,
        },
      },
      required: true,
      description: "create group session request body",
    },
  },
  responses: {
    200: {
      description: "Create group session success response",
      content: {
        "application/json": {
          schema: RespCreateGroupSession,
        },
      },
    },
  },
};
