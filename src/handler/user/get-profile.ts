import { Request, Response } from "express";
import { IRespSelfProfile, RespGetProfile, buildErr } from "../../contract";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { authMiddleware } from "../../middleware/auth";
import { zoa } from "../../util";
import { HttpStatusCode } from "../../constant";
import { userUsecase } from "../../usecase";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      const response: IRespSelfProfile = {
        success: false,
        message: "User ID not found",
        error: "User ID not found",
      };
      return res.status(HttpStatusCode.BadRequest.code).json(response);
    }

    const user = await userUsecase.findById(userId);
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
      message: "Get Profile success",
      data: user,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getProfileHandler: IHandler = {
  path: ENDPOINTS.USER.GET_PROFILE.path,
  method: ENDPOINTS.USER.GET_PROFILE.method,
  handler: getProfile,
  middlewares: [],
  request: {
    params: zoa.object({
      id: zoa.string().openapi({
        description: "User ID",
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "Get Profile success response",
      content: {
        "application/json": {
          schema: RespGetProfile,
        },
      },
    },
  },
};
