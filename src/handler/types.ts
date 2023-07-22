import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Role } from "@prisma/client";
import { RequestHandler } from "express";
import { REST_METHOD_VALUES } from "../constant";
import { Prettify } from "../util";

export type IHandler = Prettify<
  RouteConfig & {
    method: REST_METHOD_VALUES;
    handler: RequestHandler;
    middlewares: RequestHandler[];
  }
>;

export type RequestConfig = Pick<RouteConfig, "request">;
export type ResponseConfig = Pick<RouteConfig, "responses">;

export type ITokenContent = {
  id: string;
  email: string;
  role: Role;
};
