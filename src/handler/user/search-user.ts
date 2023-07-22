import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IQuerySearchUser,
  IRespSearchUser,
  QuerySearchUser,
  RespSearchUser,
  buildErr,
} from "../../contract";

import { optionalAuthMiddleware } from "../../middleware/optional-auth";
import { userUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler, ITokenContent } from "../types";

export const searchUser = async (req: Request, res: Response) => {
  try {
    const query: IQuerySearchUser = {
      role:
        typeof req.query.role === "string"
          ? (req.query.role as "MENTOR" | "MENTEE")
          : undefined,
      tagIds: typeof req.query.tagIds === "string" ? req.query.tagIds : "",
      onMyCity:
        typeof req.query.onMyCity === "string"
          ? req.query.onMyCity === "true"
            ? true
            : undefined
          : undefined,
      onMyProvince:
        typeof req.query.onMyProvince === "string"
          ? req.query.onMyProvince === "true"
            ? true
            : undefined
          : undefined,
      premiumOnly:
        typeof req.query.premiumOnly === "string"
          ? req.query.premiumOnly === "true"
            ? true
            : undefined
          : undefined,
    };

    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;
    if (!tokenContent) {
      const users = await userUsecase.searchGuest(query);

      const response: IRespSearchUser = {
        success: true,
        message: "Search user success",
        data: users,
      };
      return res.status(HttpStatusCode.OK.code).json(response);
    }

    const users = await userUsecase.search(query, tokenContent.id);
    const response: IRespSearchUser = {
      success: true,
      message: "Search user success",
      data: users,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const searchUserHandler: IHandler = {
  path: ENDPOINTS.USER.SEARCH_USER.path,
  method: ENDPOINTS.USER.SEARCH_USER.method,
  handler: searchUser,
  middlewares: [optionalAuthMiddleware],
  request: {
    query: QuerySearchUser,
  },
  responses: {
    200: {
      description: "Search user success response",
      content: {
        "application/json": {
          schema: RespSearchUser,
        },
      },
    },
  },
};
