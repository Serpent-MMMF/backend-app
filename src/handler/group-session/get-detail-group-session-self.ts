import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IParamsIdGroupSession,
  IRespGroupSessionDetailSelf,
  ParamsIdGroupSession,
  RespGroupSessionDetailSelf,
  buildErr,
} from "../../contract";
import { groupSessionUseCase, userUsecase } from "../../usecase/";
import { ENDPOINTS } from "../endpoints";
import { IHandler, ITokenContent } from "../types";
import { authMiddleware } from "../../middleware";

export const getDetailGroupSessionSelf = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params as IParamsIdGroupSession;
    
    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const response: IRespGroupSessionDetailSelf = {
        success: false,
        message: "Token not found",
        error: "Token not found",
      };
      return res.status(HttpStatusCode.Unauthorized.code).json(response);
    }
    
    const user = await userUsecase.findById(tokenContent.id);
    if (!user) {
      const response: IRespGroupSessionDetailSelf = {
        success: false,
        message: "User not found",
        error: "User not found",
      };
      return res.status(HttpStatusCode.NotFound.code).json(response);
    }

    const groupSession = await groupSessionUseCase.availability(id, user.id);
    if (!groupSession) {
      const response: IRespGroupSessionDetailSelf = {
        success: false,
        message: "Group session not found",
      };
      return res.status(404).json(response);
    }

    const response: IRespGroupSessionDetailSelf = {
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

export const getDetailGroupSessionSelfHandler: IHandler = {
  path: ENDPOINTS.GROUP_SESSION.GET_DETAIL_GROUP_SESSION_SELF.path,
  method: ENDPOINTS.GROUP_SESSION.GET_DETAIL_GROUP_SESSION_SELF.method,
  handler: getDetailGroupSessionSelf,
  middlewares: [authMiddleware],
  request: {
    params: ParamsIdGroupSession,
  },
  responses: {
    200: {
      description: "Get detail group session success response",
      content: {
        "application/json": {
          schema: RespGroupSessionDetailSelf,
        },
      },
    },
  },
};
