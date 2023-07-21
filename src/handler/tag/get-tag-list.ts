import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getTagList = async (req: Request, res: Response) => {
  try {
    res.send("Not implemented");
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getTagListHandler: IHandler = {
  path: ENDPOINTS.TAG.GET_TAG_LIST.path,
  method: ENDPOINTS.TAG.GET_TAG_LIST.method,
  handler: getTagList,
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
