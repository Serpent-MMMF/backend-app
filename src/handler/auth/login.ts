import { Request, Response } from "express";
import { HttpStatusCode } from "../../constant";
import { buildErr, IRespLogin, ReqLogin, RespLogin } from "../../contract";
import { authUsecase } from "../../usecase";
import { ENDPOINTS } from "../endpoints";
import { IHandler } from "../types";

export const login = async (req: Request, res: Response) => {
  try {
    const reqBody = ReqLogin.safeParse(req.body);
    if (!reqBody.success) {
      const response: IRespLogin = {
        success: false,
        message: "Invalid request body",
        error: reqBody.error.message,
      };
      return res.status(400).json(response);
    }

    const result = await authUsecase.login(reqBody.data);

    const response: IRespLogin = {
      success: true,
      message: "Login success",
      data: result,
    };
    return res.status(HttpStatusCode.OK.code).json(response);
  } catch (err) {
    console.error(err);
    const { response, status } = buildErr(err);
    return res.status(status.code).json(response);
  }
};

export const loginHandler: IHandler = {
  path: ENDPOINTS.AUTH.LOGIN.path,
  method: ENDPOINTS.AUTH.LOGIN.method,
  handler: login,
  middlewares: [],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqLogin,
        },
      },
      required: true,
      description: "Login request body",
    },
  },
  responses: {
    200: {
      description: "Login success response",
      content: {
        "application/json": {
          schema: RespLogin,
        },
      },
    },
  },
};
