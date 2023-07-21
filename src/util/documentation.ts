import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { IHandler } from "../handler";
import * as yaml from "yaml";
import * as fs from "fs";

export const registry = new OpenAPIRegistry();

export const generateDocs = (handlers: IHandler[]) => {
  const bearerAuth = registry.registerComponent(
    "securitySchemes",
    "bearerAuth",
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    }
  );

  const genResponses = (obj: IHandler["responses"]) => {
    return Object.keys(obj).reduce(function (
      result: any,
      key: keyof typeof obj
    ) {
      result[key] = obj[key];
      return result;
    },
    {});
  };

  handlers.forEach((handler) => {
    const splitted = handler.path.split("/");
    const path = splitted
      .map((e) => {
        if (e[0] === ":") {
          return `{${e.slice(1)}}`;
        }
        return e;
      })
      .join("/");

    registry.registerPath({
      method: handler.method,
      path: path,
      security: [{ [bearerAuth.name]: [] }],
      request: handler.request,
      responses: genResponses(handler.responses),
    });
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const docs = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
      description: "This is the API",
    },
    servers: [],
  });

  fs.writeFileSync(
    `${__dirname}/../../doc/openapi-docs.json`,
    JSON.stringify(docs)
  );

  // YAML equivalent
  const fileContent = yaml.stringify(docs);

  fs.writeFileSync(`${__dirname}/../../doc/openapi-docs.yml`, fileContent, {
    encoding: "utf-8",
  });

  return docs;
};
