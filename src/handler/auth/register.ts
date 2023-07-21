import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import { IRespRegister, ReqRegister, RespRegister } from "../../contract";
import { buildErr } from "../../contract/base";
import { authUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const register = async (req: Request, res: Response) => {
  try {
    const reqBody = ReqRegister.safeParse(req.body);
    if (!reqBody.success) {
      const response = {
        success: false,
        message: "Invalid request body",
        error: reqBody.error.message,
      };
      return res.status(400).json(response);
    }

    const result = await authUsecase.register(reqBody.data);

    const response: IRespRegister = {
      success: true,
      message: "Register success",
      data: result,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const registerHandler: IHandler = {
  path: ENDPOINTS.AUTH.REGISTER.path,
  method: ENDPOINTS.AUTH.REGISTER.method,
  handler: register,
  middlewares: [],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqRegister,
        },
      },
      required: true,
      description: "Register request body",
    },
  },
  responses: {
    200: {
      description: "Register success response",
      content: {
        "application/json": {
          schema: RespRegister,
        },
      },
    },
  },
};
