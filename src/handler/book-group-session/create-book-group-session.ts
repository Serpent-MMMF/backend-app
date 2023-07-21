import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";
import { authMiddleware } from "../../middleware/auth";
import { menteeCheckMiddleware } from "../../middleware/mentee-check";

export const createBookGroupSession = async (req: Request, res: Response) => {
  try {
    res.send("Not implemented");
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const createBookGroupSessionHandler: IHandler = {
  path: ENDPOINTS.BOOK_GROUP_SESSION.CREATE_BOOK_GROUP_SESSION.path,
  method: ENDPOINTS.BOOK_GROUP_SESSION.CREATE_BOOK_GROUP_SESSION.method,
  handler: createBookGroupSession,
  middlewares: [
    authMiddleware,
    menteeCheckMiddleware,
  ],
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
