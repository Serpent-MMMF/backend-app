export const HttpStatusCode = {
  OK: {
    msg: "OK",
    code: 200,
  },
  Created: {
    msg: "Created",
    code: 201,
  },
  Accepted: {
    msg: "Accepted",
    code: 202,
  },
  NonAuthoritativeInformation: {
    msg: "Non-Authoritative Information",
    code: 203,
  },
  NoContent: {
    msg: "No Content",
    code: 204,
  },
  ResetContent: {
    msg: "Reset Content",
    code: 205,
  },
  PartialContent: {
    msg: "Partial Content",
    code: 206,
  },
  MultipleChoices: {
    msg: "Multiple Choices",
    code: 300,
  },
  MovedPermanently: {
    msg: "Moved Permanently",
    code: 301,
  },
  Found: {
    msg: "Found",
    code: 302,
  },
  SeeOther: {
    msg: "See Other",
    code: 303,
  },
  NotModified: {
    msg: "Not Modified",
    code: 304,
  },
  UseProxy: {
    msg: "Use Proxy",
    code: 305,
  },
  Unused: {
    msg: "Unused",
    code: 306,
  },
  TemporaryRedirect: {
    msg: "Temporary Redirect",
    code: 307,
  },
  BadRequest: {
    msg: "Bad Request",
    code: 400,
  },
  Unauthorized: {
    msg: "Unauthorized",
    code: 401,
  },
  PaymentRequired: {
    msg: "Payment Required",
    code: 402,
  },
  Forbidden: {
    msg: "Forbidden",
    code: 403,
  },
  NotFound: {
    msg: "Not Found",
    code: 404,
  },
  MethodNotAllowed: {
    msg: "Method Not Allowed",
    code: 405,
  },
  NotAcceptable: {
    msg: "Not Acceptable",
    code: 406,
  },
  ProxyAuthenticationRequired: {
    msg: "Proxy Authentication Required",
    code: 407,
  },
  RequestTimeout: {
    msg: "Request Timeout",
    code: 408,
  },
  Conflict: {
    msg: "Conflict",
    code: 409,
  },
  Gone: {
    msg: "Gone",
    code: 410,
  },
  LengthRequired: {
    msg: "Length Required",
    code: 411,
  },
  PreconditionRequired: {
    msg: "Precondition Required",
    code: 412,
  },
  RequestEntryTooLarge: {
    msg: "Request Entry Too Large",
    code: 413,
  },
  "Request-URITooLong": {
    msg: "Request-URI Too Long",
    code: 414,
  },
  UnsupportedMediaType: {
    msg: "Unsupported Media Type",
    code: 415,
  },
  RequestedRangeNotSatisfiable: {
    msg: "Requested Range Not Satisfiable",
    code: 416,
  },
  ExpectationFailed: {
    msg: "Expectation Failed",
    code: 417,
  },
  Imateapot: {
    msg: "I'm a teapot",
    code: 418,
  },
  TooManyRequests: {
    msg: "Too Many Requests",
    code: 429,
  },
  InternalServerError: {
    msg: "Internal Server Error",
    code: 500,
  },
  NotImplemented: {
    msg: "Not Implemented",
    code: 501,
  },
  BadGateway: {
    msg: "Bad Gateway",
    code: 502,
  },
  ServiceUnavailable: {
    msg: "Service Unavailable",
    code: 503,
  },
  GatewayTimeout: {
    msg: "Gateway Timeout",
    code: 504,
  },
  HTTPVersionNotSupported: {
    msg: "HTTP Version Not Supported",
    code: 505,
  },
} as const;

export type HttpStatusCodeKey = keyof typeof HttpStatusCode;
export type HttpStatusCodeValue = (typeof HttpStatusCode)[HttpStatusCodeKey];

export const REST_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
} as const;

export type REST_METHOD_KEYS = keyof typeof REST_METHOD;
export type REST_METHOD_VALUES = (typeof REST_METHOD)[REST_METHOD_KEYS];

export const BASE_PATH = {
  AUTH: "/auth",
  USER: "/user",
  TAG: "/tag",
  CITY: "/city",
  PROVINCE: "/province",
  BOOK_GROUP_SESSION: "/book-group-session",
  GROUP_SESSION: "/group-session",
  DISCUSSION: "/discussion",
} as const;

export type BASE_PATH_KEYS = keyof typeof BASE_PATH;
export type BASE_PATH_VALUES = (typeof BASE_PATH)[BASE_PATH_KEYS];
