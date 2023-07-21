import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../internal";
import { HttpStatusCode } from "../constant";
import { buildErr } from "../contract/base";
import { HttpError } from "../error";

export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next();
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, CONFIG.JWT_SECRET, (err, tokenContent) => {
      if (err) {
        const { response, status } = buildErr(
          new HttpError(
            HttpStatusCode.Forbidden,
            new Error("Your token is invalid")
          )
        );
        return res.status(status.code).json(response);
      }

      res.locals.tokenContent = tokenContent;
      next();
    });
  }
};
