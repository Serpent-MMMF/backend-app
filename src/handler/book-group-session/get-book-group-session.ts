import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IQueryGetBookGroupSession,
  IRespGetBookGroupSession,
  QueryGetBookGroupSession,
  RespGetBookGroupSession,
  buildErr,
} from "../../contract";
import { authMiddleware } from "../../middleware/auth";
import { bookGroupSessionUseCase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getBookGroupSession = async (req: Request, res: Response) => {
  try {
    const sessionId = req.query.sessionId;
    const menteeId = req.query.menteeId;
    const query: IQueryGetBookGroupSession = {
      sessionId: typeof sessionId === "string" ? sessionId : undefined,
      menteeId: typeof menteeId === "string" ? menteeId : undefined,
    };

    const bookGroupSessions = await bookGroupSessionUseCase.query(
      query.menteeId,
      query.sessionId
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
  middlewares: [],
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
