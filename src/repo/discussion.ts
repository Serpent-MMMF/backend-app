import { PrismaClient } from "@prisma/client";
import type {
  DiscussionModel,
  OptionalDiscussionModel,
  OptionalExceptIdDiscussionModel,
} from "../model";
import { prisma } from "../service";
import { AllOptional } from "../util";
import type { Repo } from "./base";

export class DiscussionRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalDiscussionModel) {
    return this.prisma.discussion.create({ data });
  }

  findMany(params?: AllOptional<DiscussionModel>) {
    return this.prisma.discussion.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<DiscussionModel>) {
    return this.prisma.discussion.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdDiscussionModel) {
    return this.prisma.discussion.update({
      where: { id: data.id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.discussion.delete({ where: { id } });
  }

  upsert(data: OptionalDiscussionModel) {
    return this.prisma.discussion.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }
}

export type IDiscussionRepo = Repo<DiscussionModel>;

export const discussionRepo: IDiscussionRepo = new DiscussionRepo(prisma);
