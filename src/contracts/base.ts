import { z } from "zod";
import { zoa } from "../util";
import { HttpError } from "../error";
import { HttpStatusCode } from "../constant";

export const BaseResponse = zoa.object({
  success: zoa.boolean(),
  message: zoa.string(),
  error: zoa.string().optional(),
});
export type IBaseResponse = z.infer<typeof BaseResponse>;

export const buildErr = (err: unknown) => {
  if (err instanceof HttpError) {
    const response: IBaseResponse = {
      success: false,
      message: `[${err.status.code}] ${err.status.msg}`,
      error: err.error.message,
    };
    return {
      response,
      status: err.status,
    };
  }

  const status = HttpStatusCode.InternalServerError;
  const response: IBaseResponse = {
    success: false,
    message: `[${status.code}] ${status.msg}`,
    error: JSON.stringify(err, Object.getOwnPropertyNames(err)),
  };
  return {
    response,
    status,
  };
};
