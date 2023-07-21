import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";
import { authMiddleware } from "../../middleware";

export const getDetailBookGroupSession = async (
  req: Request,
  res: Response
) => {
  try {
    res.send("Not implemented");
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
    body: {
      content: {},
      required: true,
      description: "Create group-session request body",
    },
  },
  responses: {
    200: {
      description: "Create group-session success response",
      content: {},
    },
  },
};
