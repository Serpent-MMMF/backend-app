import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";
import { authMiddleware, mentorCheckMiddleware } from "../../middleware";

export const createGroupSession = async (req: Request, res: Response) => {
  try {
    res.send("Not implemented");
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const createGroupSessionHandler: IHandler = {
  path: ENDPOINTS.GROUP_SESSION.CREATE_GROUP_SESSION.path,
  method: ENDPOINTS.GROUP_SESSION.CREATE_GROUP_SESSION.method,
  handler: createGroupSession,
  middlewares: [
    authMiddleware,
    mentorCheckMiddleware,
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
