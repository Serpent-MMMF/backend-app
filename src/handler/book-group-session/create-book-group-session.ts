import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IRespCreateBookGroupSession,
  ReqCreateBookGroupSession,
  RespCreateBookGroupSession,
  buildErr,
} from "../../contract";
import { authMiddleware } from "../../middleware/auth";
import { menteeCheckMiddleware } from "../../middleware/mentee-check";
import { bookGroupSessionUseCase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const createBookGroupSession = async (req: Request, res: Response) => {
  try {
    const reqBody = ReqCreateBookGroupSession.safeParse(req.body);

    if (!reqBody.success) {
      const response: IRespCreateBookGroupSession = {
        success: false,
        message: "Invalid request body",
        error: reqBody.error.message,
      };
      return res.status(HttpStatusCode.Forbidden.code).json(response);
    }

    const user = res.locals.tokenContent;
    const bookGroupSession = await bookGroupSessionUseCase.create(
      user.id,
      reqBody.data.sessionId
    );

    const response: IRespCreateBookGroupSession = {
      success: true,
      message: "Create book group session success",
      data: bookGroupSession,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const createBookGroupSessionHandler: IHandler = {
  path: ENDPOINTS.BOOK_GROUP_SESSION.CREATE_BOOK_GROUP_SESSION.path,
  method: ENDPOINTS.BOOK_GROUP_SESSION.CREATE_BOOK_GROUP_SESSION.method,
  handler: createBookGroupSession,
  middlewares: [authMiddleware, menteeCheckMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqCreateBookGroupSession,
        },
      },
      required: true,
      description: "Create book group session request body",
    },
  },
  responses: {
    200: {
      description: "Create book group session success response",
      content: {
        "application/json": {
          schema: RespCreateBookGroupSession,
        },
      },
    },
  },
};
