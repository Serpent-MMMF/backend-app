import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import {
  IQuerySearchUser,
  IRespSearchUser,
  QuerySearchUser,
  RespSearchUser,
  buildErr,
} from "../../contract";
import { ITokenContent } from "../../internal";
import { optionalAuthMiddleware } from "../../middleware/optional-auth";
import { userUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

const buildQuery = (reqQuery: Request["query"]) => {
  const query: IQuerySearchUser = {
    role:
      typeof reqQuery.role === "string"
        ? (reqQuery.role as "MENTOR" | "MENTEE")
        : undefined,
    tagIds: typeof reqQuery.tagIds === "string" ? reqQuery.tagIds : "",
    onMyCity:
      typeof reqQuery.onMyCity === "string"
        ? reqQuery.onMyCity === "true"
          ? true
          : undefined
        : undefined,
    onMyProvince:
      typeof reqQuery.onMyProvince === "string"
        ? reqQuery.onMyProvince === "true"
          ? true
          : undefined
        : undefined,
    premiumOnly:
      typeof reqQuery.premiumOnly === "string"
        ? reqQuery.premiumOnly === "true"
          ? true
          : undefined
        : undefined,
  };
  return query;
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const query = buildQuery(req.query);

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
