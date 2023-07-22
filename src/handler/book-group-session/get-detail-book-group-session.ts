import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IParamsIdBookGroupSession,
  IRespGetDetailBookGroupSession,
  ParamsIdBookGroupSession,
  RespGetDetailBookGroupSession,
  buildErr,
} from "../../contract";
import { authMiddleware } from "../../middleware/auth";
import { bookGroupSessionUseCase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler, ITokenContent } from "../types";

export const getDetailBookGroupSession = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params as IParamsIdBookGroupSession;

    const bookGroupSession = await bookGroupSessionUseCase.findById(id);
    if (!bookGroupSession) {
      const response: IRespGetDetailBookGroupSession = {
        success: false,
        message: "Book group session not found",
      };
      return res.status(HttpStatusCode.NotFound.code).json(response);
    }

    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const response: IRespGetDetailBookGroupSession = {
        success: false,
        message: "Token not found",
        error: "Token not found",
      };
      return res.status(HttpStatusCode.Unauthorized.code).json(response);
    }

    if (bookGroupSession.menteeId !== tokenContent.id) {
      const response: IRespGetDetailBookGroupSession = {
        success: false,
        message: "You don't book this book group session",
      };
      return res.status(HttpStatusCode.Forbidden.code).json(response);
    }

    const response: IRespGetDetailBookGroupSession = {
      success: true,
      message: "Get detail book group session success",
      data: bookGroupSession,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getDetailBookGroupSessionHandler: IHandler = {
  path: ENDPOINTS.BOOK_GROUP_SESSION.GET_DETAIL_BOOK_GROUP_SESSION.path,
  method: ENDPOINTS.BOOK_GROUP_SESSION.GET_DETAIL_BOOK_GROUP_SESSION.method,
  handler: getDetailBookGroupSession,
  middlewares: [authMiddleware],
  request: {
    params: ParamsIdBookGroupSession,
  },
  responses: {
    200: {
      description: "Get detail book group session success response",
      content: {
        "application/json": {
          schema: RespGetDetailBookGroupSession,
        },
      },
    },
  },
};
