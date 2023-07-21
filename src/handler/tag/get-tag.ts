import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getTag = async (req: Request, res: Response) => {
  try {
    res.send("Not implemented");
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getTagHandler: IHandler = {
  path: ENDPOINTS.TAG.GET_TAG.path,
  method: ENDPOINTS.TAG.GET_TAG.method,
  handler: getTag,
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
