import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../constant";
import { buildErr } from "../contract/base";
import { HttpError } from "../error";
import { ITokenContent } from "../internal";

export const validateRoleMiddleware = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const tokenContent: ITokenContent | undefined = res.locals.tokenContent;

    if (!tokenContent) {
      const { response, status } = buildErr(
        new HttpError(
          HttpStatusCode.Forbidden,
          new Error("You must login to access this resource")
        )
      );
      return res.status(status.code).json(response);
    } else if (tokenContent.role !== role) {
      const { response, status } = buildErr(
        new HttpError(
          HttpStatusCode.Forbidden,
          new Error("Your role is not " + role)
        )
      );
      return res.status(status.code).json(response);
    } else {
      next();
    }
  };
};
