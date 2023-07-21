import { BASE_PATH, REST_METHOD } from "../constant";

export const ENDPOINTS = {
  AUTH: {},
  CITY: {},
  PROVINCE: {},
  USER: {},
  TAG: {},
  BOOK_GROUP_SESSION: {
    CREATE_BOOK_GROUP_SESSION: {
      path: BASE_PATH.BOOK_GROUP_SESSION,
      method: REST_METHOD.POST,
    },
    GET_BOOK_GROUP_SESSION: {
      path: BASE_PATH.BOOK_GROUP_SESSION,
      method: REST_METHOD.GET,
    },
    GET_DETAIL_BOOK_GROUP_SESSION: {
      path: BASE_PATH.BOOK_GROUP_SESSION + "/:id",
      method: REST_METHOD.GET,
    },
  },
  GROUP_SESSION: {
    CREATE_GROUP_SESSION: {
      path: BASE_PATH.GROUP_SESSION,
      method: REST_METHOD.POST,
    },
    GET_GROUP_SESSION: {
      path: BASE_PATH.GROUP_SESSION,
      method: REST_METHOD.GET,
    },
    GET_DETAIL_GROUP_SESSION: {
      path: BASE_PATH.GROUP_SESSION + "/:id",
      method: REST_METHOD.GET,
    },
  },
} as const;
