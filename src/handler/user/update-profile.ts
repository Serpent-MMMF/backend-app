import { RequestHandler } from "express";
import { IRespUpdateProfile, ReqUpdateProfile, RespUpdateProfile, buildErr } from "../../contract";
import { Request, Response } from "express";
import { ITokenContent } from "../../internal";
import { HttpStatusCode } from "../../constant";
import { tagUsecase, userUsecase } from "../../usecase";
import { SubscriptionStatus } from "@prisma/client";
import { authMiddleware } from "../../middleware";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const response: IRespUpdateProfile = {
        success: false,
        message: "Token content not found",
        error: "Token content not found",
      };
      return res.status(HttpStatusCode.Unauthorized.code).json(response);
    }

    const reqBody = ReqUpdateProfile.safeParse(req.body);
    if (!reqBody.success) {
      const response: IRespUpdateProfile = {
        success: false,
        message: "Request body not valid",
        error: reqBody.error.message,
      };
      return res.status(HttpStatusCode.BadRequest.code).json(response);
    }

    const { tagIds, ...restReqBody } = reqBody.data;

    const result = await userUsecase.update({
      id: tokenContent.id,
      ...restReqBody,
      subscriptionStatus: restReqBody.subscriptionStatus as SubscriptionStatus,
    });

    const tagIdsArr = tagIds.split(",");
    await tagUsecase.upsertUserTag(tagIdsArr, tokenContent.id);

    const response: IRespUpdateProfile = {
      success: true,
      message: "Update profile success",
      data: result,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const updateProfileHandler: IHandler = {
  path: ENDPOINTS.USER.UPDATE_PROFILE.path,
  method: ENDPOINTS.USER.UPDATE_PROFILE.method,
  handler: updateProfile,
  middlewares: [authMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqUpdateProfile,
        },
      },
      required: true,
      description: "Update Profile request body",
    },
  },
  responses: {
    200: {
      description: "Update Profile success response",
      content: {
        "application/json": {
          schema: RespUpdateProfile,
        },
      },
    },
  },
};
