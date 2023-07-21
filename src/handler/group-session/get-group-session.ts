import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import {
  IRespGetGroupSession,
  QueryGetGroupSession,
  RespGetGroupSession,
} from "../../contract/group-session";
import { groupSessionUseCase } from "../../usecase/group-session";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getGroupSession = async (req: Request, res: Response) => {
  try {
    const reqQuery = QueryGetGroupSession.safeParse(req.query);

    if (!reqQuery.success) {
      const response: IRespGetGroupSession = {
        success: false,
        message: "Invalid request query",
        error: reqQuery.error.message,
      };
      return res.status(400).json(response);
    }

    const groupSessions = await groupSessionUseCase.query(reqQuery.data);

    const response: IRespGetGroupSession = {
      success: true,
      message: "Get group session success",
      data: groupSessions,
    };
    return res.status(200).json(response);
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
    query: QueryGetGroupSession,
  },
  responses: {
    200: {
      description: "Get group session success response",
      content: {
        "application/json": {
          schema: RespGetGroupSession,
        },
      },
    },
  },
};
