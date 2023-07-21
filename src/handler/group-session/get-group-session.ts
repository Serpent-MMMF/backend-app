import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getGroupSession = async (req: Request, res: Response) => {
  try {
    res.send("Not implemented");
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getGroupSessionHandler: IHandler = {
  path: ENDPOINTS.GROUP_SESSION.GET_GROUP_SESSION.path,
  method: ENDPOINTS.GROUP_SESSION.GET_GROUP_SESSION.method,
  handler: getGroupSession,
  middlewares: [],
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
