import { ApprovalStatus, SubscriptionStatus } from "@prisma/client";
import { HttpStatusCode } from "../constant";
import { HttpError } from "../error";
import {
  OptionalExceptIdOneOnOneModel,
  OptionalNonIdOneOnOneModel,
  OptionalOneOnOneModel,
  OneOnOneModel,
} from "../model";
import { IOneOnOneRepo, oneOnOneRepo } from "../repo";
import { AllOptional } from "../util";
import {
  IReqAddReviewRating,
  IReqApproveOneOnOne,
  IReqCreateOneOnOne,
} from "../contract";

export class OneOnOneUsecase implements IOneOnOneUsecase {
  private oneOnOneRepository: IOneOnOneRepo;

  constructor(params: { oneOnOneRepository: IOneOnOneRepo }) {
    this.oneOnOneRepository = params.oneOnOneRepository;
  }

  create(data: IReqCreateOneOnOne, menteeId: string): Promise<OneOnOneModel> {
    return this.oneOnOneRepository.create({
      ...data,
      approvalStatus: ApprovalStatus.PENDING,
      menteeId,
      meetingUrl: null,
      review: null,
      rating: null,
    });
  }

  findMany(params?: AllOptional<OneOnOneModel>) {
    return this.oneOnOneRepository.findMany(params);
  }

  findById(id: string) {
    return this.oneOnOneRepository.findOne({ id });
  }

  update(data: OptionalExceptIdOneOnOneModel) {
    return this.oneOnOneRepository.update(data);
  }

  delete(id: string) {
    return this.oneOnOneRepository.delete(id);
  }

  async approve(data: IReqApproveOneOnOne, id: string, mentorId: string) {
    const oneOnOne = await this.findById(id);
    if (!oneOnOne) {
      throw new HttpError(
        HttpStatusCode.NotFound,
        new Error("One on one not found")
      );
    }

    if (oneOnOne.mentorId !== mentorId) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("One on one is not yours")
      );
    }

    if (oneOnOne.approvalStatus !== ApprovalStatus.PENDING) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("One on one is not pending")
      );
    }

    return this.oneOnOneRepository.update({
      id,
      approvalStatus: ApprovalStatus.APPROVED,
      meetingUrl: data.meetingUrl,
    });
  }

  async reject(id: string, mentorId: string) {
    const oneOnOne = await this.findById(id);
    if (!oneOnOne) {
      throw new HttpError(
        HttpStatusCode.NotFound,
        new Error("One on one not found")
      );
    }

    if (oneOnOne.mentorId !== mentorId) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("One on one is not yours")
      );
    }

    if (oneOnOne.approvalStatus !== ApprovalStatus.PENDING) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("One on one is not pending")
      );
    }

    return this.oneOnOneRepository.update({
      id,
      approvalStatus: ApprovalStatus.REJECTED,
    });
  }

  async addReviewRating(
    data: IReqAddReviewRating,
    id: string,
    menteeId: string
  ) {
    const oneOnOne = await this.findById(id);
    if (!oneOnOne) {
      throw new HttpError(
        HttpStatusCode.NotFound,
        new Error("One on one not found")
      );
    }

    if (oneOnOne.menteeId !== menteeId) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("One on one is not yours")
      );
    }

    // TODO: validate whether the timezone is correct
    if (oneOnOne.date < new Date()) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("One on one is not yet finished")
      );
    }

    return this.oneOnOneRepository.update({
      id,
      review: data.review,
      rating: data.rating,
    });
  }
}

export type IOneOnOneUsecase = {
  create: (
    data: IReqCreateOneOnOne,
    menteeId: string
  ) => Promise<OneOnOneModel>;
  findMany: () => Promise<OneOnOneModel[]>;
  findById: (id: string) => Promise<OneOnOneModel | null>;
  update: (data: OptionalNonIdOneOnOneModel) => Promise<OneOnOneModel>;
  delete: (id: string) => Promise<OneOnOneModel>;
  approve: (
    data: IReqApproveOneOnOne,
    id: string,
    mentee: string
  ) => Promise<OneOnOneModel>;
  reject: (id: string, mentee: string) => Promise<OneOnOneModel>;
  addReviewRating: (
    data: IReqAddReviewRating,
    id: string,
    mentee: string
  ) => Promise<OneOnOneModel>;
};

export const oneOnOneUsecase = new OneOnOneUsecase({
  oneOnOneRepository: oneOnOneRepo,
});
