import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IRespGetBookGroupSession,
  QueryGetBookGroupSession,
  RespGetBookGroupSession,
  buildErr,
} from "../../contract";
import { authMiddleware } from "../../middleware/auth";
import { bookGroupSessionUseCase } from "../../usecase/book-group-session";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getBookGroupSession = async (req: Request, res: Response) => {
  try {
    const reqQuery = QueryGetBookGroupSession.safeParse(req.query);

    if (!reqQuery.success) {
      const response: IRespGetBookGroupSession = {
        success: false,
        message: "Invalid request query",
        error: reqQuery.error.message,
      };
      return res.status(HttpStatusCode.Forbidden.code).json(response);
    }

    const bookGroupSessions = await bookGroupSessionUseCase.query(
      reqQuery.data.menteeId,
      reqQuery.data.sessionId
    );

    const response: IRespGetBookGroupSession = {
      success: true,
      message: "Get book group session success",
      data: bookGroupSessions,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getBookGroupSessionHandler: IHandler = {
  path: ENDPOINTS.BOOK_GROUP_SESSION.GET_BOOK_GROUP_SESSION.path,
  method: ENDPOINTS.BOOK_GROUP_SESSION.GET_BOOK_GROUP_SESSION.method,
  handler: getBookGroupSession,
  middlewares: [authMiddleware],
  request: {
    query: QueryGetBookGroupSession,
  },
  responses: {
    200: {
      description: "Get book group session success response",
      content: {
        "application/json": {
          schema: RespGetBookGroupSession,
        },
      },
    },
  },
};
