import { BASE_PATH, REST_METHOD } from "../constant";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: {
      path: BASE_PATH.AUTH + "/login",
      method: REST_METHOD.POST,
    },
    REGISTER: {
      path: BASE_PATH.AUTH + "/register",
      method: REST_METHOD.POST,
    },
  },
  USER: {
    SEARCH_USER: {
      path: BASE_PATH.USER,
      method: REST_METHOD.GET,
    },
    GET_PROFILE: {
      path: BASE_PATH.USER + "/:id",
      method: REST_METHOD.GET,
    },
    UPDATE_PROFILE: {
      path: BASE_PATH.USER + "/self",
      method: REST_METHOD.PUT,
    },
    MY_PROFILE: {
      path: BASE_PATH.USER + "/self",
      method: REST_METHOD.GET,
    },
  },
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
  DISCUSSION: {
    CREATE_DISCUSSION: {
      path: BASE_PATH.DISCUSSION,
      method: REST_METHOD.POST,
    },
    GET_DISCUSSION: {
      path: BASE_PATH.DISCUSSION,
      method: REST_METHOD.GET,
    },
  },
  ONE_ON_ONE: {
    CREATE_ONE_ON_ONE: {
      path: BASE_PATH.ONE_ON_ONE,
      method: REST_METHOD.POST,
    },
    GET_ONE_ON_ONE: {
      path: BASE_PATH.ONE_ON_ONE,
      method: REST_METHOD.GET,
    },
    GET_DETAIL_ONE_ON_ONE: {
      path: BASE_PATH.ONE_ON_ONE + "/:id",
      method: REST_METHOD.GET,
    },
    APPROVE_ONE_ON_ONE: {
      path: BASE_PATH.ONE_ON_ONE + "/:id/approve",
      method: REST_METHOD.PATCH,
    },
    REJECT_ONE_ON_ONE: {
      path: BASE_PATH.ONE_ON_ONE + "/:id/reject",
      method: REST_METHOD.PATCH,
    },
    ADD_RATING_REVIEW_ONE_ON_ONE: {
      path: BASE_PATH.ONE_ON_ONE + "/:id/rating-review",
      method: REST_METHOD.POST,
    },
  },
} as const;
