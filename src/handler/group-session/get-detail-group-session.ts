import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IParamsIdGroupSession,
  IRespCreateGroupSession,
  ParamsIdGroupSession,
  RespGetDetailGroupSession,
  buildErr,
} from "../../contract";
import { groupSessionUseCase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getDetailGroupSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as IParamsIdGroupSession;

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
    return res.status(HttpStatusCode.OK.code).json(response);
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
    params: ParamsIdGroupSession,
  },
  responses: {
    200: {
      description: "Get detail group session success response",
      content: {
        "application/json": {
          schema: RespGetDetailGroupSession,
        },
      },
    },
  },
};
