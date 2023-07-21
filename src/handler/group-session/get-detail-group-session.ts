import { Request, Response } from "express";
import { buildErr } from "../../contract/base";
import {
  IReqGetDetailGroupSession,
  IRespCreateGroupSession,
  ReqGetDetailGroupSession,
  RespGetDetailGroupSession,
} from "../../contract/group-session";
import { groupSessionUseCase } from "../../usecase/group-session";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDetailGroupSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as IReqGetDetailGroupSession;

    const groupSession = await groupSessionUseCase.findById(id);
    if (!groupSession) {
      const response: IRespCreateGroupSession = {
        success: false,
        message: "Group session not found",
      };
      return res.status(404).json(response);
    }

    const response: IRespCreateGroupSession = {
      success: true,
      message: "Get detail group session success",
      data: groupSession,
    };
    return res.status(200).json(response);
  } catch (err) {
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getDetailGroupSessionHandler: IHandler = {
  path: ENDPOINTS.GROUP_SESSION.GET_DETAIL_GROUP_SESSION.path,
  method: ENDPOINTS.GROUP_SESSION.GET_DETAIL_GROUP_SESSION.method,
  handler: getDetailGroupSession,
  middlewares: [],
  request: {
    params: ReqGetDetailGroupSession,
  },
  responses: {
    200: {
      description: "get detail group session success response",
      content: {
        "application/json": {
          schema: RespGetDetailGroupSession,
        },
      },
    },
  },
};
