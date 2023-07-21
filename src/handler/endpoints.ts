import { BASE_PATH, REST_METHOD } from "../constant";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: {
      path: BASE_PATH.USER + "/login",
      method: REST_METHOD.POST,
    },
    REGISTER: {
      path: BASE_PATH.USER + "/register",
      method: REST_METHOD.POST,
    },
  },
  USER: {},
  TAG: {
    GET_TAG: {
      path: BASE_PATH.TAG,
      method: REST_METHOD.GET,
    },
    GET_TAG_LIST: {
      path: BASE_PATH.TAG + "/list",
      method: REST_METHOD.GET,
    },
  },
  CITY: {
    GET_CITY: {
      path: BASE_PATH.CITY,
      method: REST_METHOD.GET,
    },
    GET_DETAIL_CITY: {
      path: BASE_PATH.CITY + "/:id",
      method: REST_METHOD.GET,
    },
  },
  PROVINCE: {
    GET_PROVINCE: {
      path: BASE_PATH.PROVINCE,
      method: REST_METHOD.GET,
    },
    GET_DETAIL_PROVINCE: {
      path: BASE_PATH.PROVINCE + "/:id",
      method: REST_METHOD.GET,
    },
  },
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
