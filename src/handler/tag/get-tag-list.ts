import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import { buildErr } from "../../contract";
import { IRespGetTagList, RespGetTagList } from "../../contract/tag";
import { tagUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const getTagList = async (req: Request, res: Response) => {
  try {
    const tags = await tagUsecase.findTags();
    const response: IRespGetTagList = {
      success: true,
      message: "Get tag success",
      data: tags,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const getTagListHandler: IHandler = {
  path: ENDPOINTS.TAG.GET_TAG_LIST.path,
  method: ENDPOINTS.TAG.GET_TAG_LIST.method,
  handler: getTagList,
  middlewares: [],
  request: {},
  responses: {
    200: {
      description: "Get tag success response",
      content: {
        "application/json": {
          schema: RespGetTagList,
        },
      },
    },
  },
};
