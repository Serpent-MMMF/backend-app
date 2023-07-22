import { Request, Response } from "express";
import { IRespSelfProfile, RespSelfProfile, buildErr } from "../../contract";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { authMiddleware } from "../../middleware/auth";
import { zoa } from "../../util";
import { ITokenContent } from "../../internal";
import { HttpStatusCode } from "../../constant";
import { userUsecase } from "../../usecase";

export const selfProfile = async (req: Request, res: Response) => {
  try {
    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const response: IRespSelfProfile = {
        success: false,
        message: "Token content not found",
        error: "Token content not found",
      };
      return res.status(HttpStatusCode.Unauthorized.code).json(response);
    }

    const user = await userUsecase.findById(tokenContent.id);
    if (!user) {
      const response: IRespSelfProfile = {
        success: false,
        message: "User not found",
        error: "User not found",
      };
      return res.status(HttpStatusCode.NotFound.code).json(response);
    }

    const response: IRespSelfProfile = {
      success: true,
      message: "Get Self Profile success",
      data: user,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const selfProfileHandler: IHandler = {
  path: ENDPOINTS.USER.MY_PROFILE.path,
  method: ENDPOINTS.USER.MY_PROFILE.method,
  handler: selfProfile,
  middlewares: [authMiddleware],
  request: {},
  responses: {
    200: {
      description: "Get Self Profile success response",
      content: {
        "application/json": {
          schema: RespSelfProfile,
        },
      },
    },
  },
};
