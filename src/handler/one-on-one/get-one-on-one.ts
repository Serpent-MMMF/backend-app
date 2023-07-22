import { Request, Response } from "express";
import {
  IQueryGetOneOnOne,
  IRespGetOneOnOne,
  QueryGetDiscussion,
  QueryGetOneOnOne,
  ReqCreateDiscussion,
  ReqCreateOneOnOne,
  RespCreateDiscussion,
  RespCreateOneOnOne,
  RespGetOneOnOne,
  RespSearchUser,
  buildErr,
} from "../../contract";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { authMiddleware } from "../../middleware/auth";
import { zoa } from "../../util";
import { oneOnOneUsecase } from "../../usecase/one-on-one";

export const getOneOnOne = async (req: Request, res: Response) => {
  try {
    const query: IQueryGetOneOnOne = req.query;

    const oneOnOne = await oneOnOneUsecase.findMany(query);
    
    const response: IRespGetOneOnOne = {
      success: true,
      message: "Get one on one success",
      data: oneOnOne,
    }
    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getOneOnOneHandler: IHandler = {
  path: ENDPOINTS.ONE_ON_ONE.GET_ONE_ON_ONE.path,
  method: ENDPOINTS.ONE_ON_ONE.GET_ONE_ON_ONE.method,
  handler: getOneOnOne,
  middlewares: [],
  request: {
    query: QueryGetOneOnOne,
  },
  responses: {
    200: {
      description: "get one on one success response",
      content: {
        "application/json": {
          schema: RespGetOneOnOne,
        },
      },
    },
  },
};
