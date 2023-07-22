import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IRespSelfProfile,
  ParamsGetProfile,
  RespGetProfile,
  buildErr,
} from "../../contract";
import { userUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      const response: IRespSelfProfile = {
        success: false,
        message: "User id not found",
        error: "User id not found",
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
      message: "Get profile success",
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
    params: ParamsGetProfile,
  },
  responses: {
    200: {
      description: "Get profile success response",
      content: {
        "application/json": {
          schema: RespGetProfile,
        },
      },
    },
  },
};
