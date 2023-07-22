import { IHandler } from "../types";
import { addReviewRatingHandler } from "./add-review-rating";
import { approveOneOnOneHandler } from "./approve-one-on-one";
import { createOneOnOneHandler } from "./create-one-on-one";
import { getDetailOneOnOneHandler } from "./get-detail-one-on-one";
import { getOneOnOneHandler } from "./get-one-on-one";
import { rejectOneOnOneHandler } from "./reject-one-on-one";

export const oneOnOneHandlers: IHandler[] = [
  addReviewRatingHandler,
  approveOneOnOneHandler,
  createOneOnOneHandler,
  getDetailOneOnOneHandler,
  getOneOnOneHandler,
  rejectOneOnOneHandler,
];
