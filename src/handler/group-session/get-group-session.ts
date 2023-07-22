import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IQueryGetGroupSession,
  IRespGetGroupSession,
  QueryGetGroupSession,
  RespGetGroupSession,
  buildErr,
} from "../../contract";
import { groupSessionUseCase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getGroupSession = async (req: Request, res: Response) => {
  try {
    const mentorId = req.query.mentorId;
    const limitStartDateTime = req.query.limitStartDateTime;
    const limitEndDateTime = req.query.limitEndDateTime;
    const reqQuery: IQueryGetGroupSession = {
      mentorId: typeof mentorId === "string" ? mentorId : undefined,
      limitStartDateTime: typeof limitStartDateTime === "string" ? new Date(limitStartDateTime) : undefined,
      limitEndDateTime: typeof limitEndDateTime === "string" ? new Date(limitEndDateTime) : undefined,
    };

    const groupSessions = await groupSessionUseCase.query(reqQuery);

    const response: IRespGetGroupSession = {
      success: true,
      message: "Get group session success",
      data: groupSessions,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
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
