import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import { IRespSelfProfile, RespSelfProfile, buildErr } from "../../contract";
import { authMiddleware } from "../../middleware/auth";
import { userUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler, ITokenContent } from "../types";

export const selfProfile = async (req: Request, res: Response) => {
  try {
    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const response: IRespSelfProfile = {
        success: false,
        message: "Token not found",
        error: "Token not found",
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
      message: "Get self profile success",
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
      description: "Get self profile success response",
      content: {
        "application/json": {
          schema: RespSelfProfile,
        },
      },
    },
  },
};
