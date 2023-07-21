import { Prisma, PrismaClient } from "@prisma/client";
import type {
  OptionalExceptIdUserTagModel,
  OptionalUserTagModel,
  UserTagModel,
} from "../model";
import { prisma } from "../service";
import { AllOptional } from "../util";
import type { Repo } from "./base";

export class UserTagRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalUserTagModel) {
    return this.prisma.userTag.create({ data });
  }

  findMany(params?: AllOptional<UserTagModel>) {
    return this.prisma.userTag.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<UserTagModel>) {
    return this.prisma.userTag.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdUserTagModel) {
    return this.prisma.userTag.update({
      where: { id: data.id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.userTag.delete({ where: { id } });
  }

  deleteMany(params: AllOptional<UserTagModel>) {
    return this.prisma.userTag.deleteMany({ where: params });
  }

  upsert(data: OptionalUserTagModel) {
    return this.prisma.userTag.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }
}

export type IUserTagRepo = Repo<UserTagModel> & {
  deleteMany: (params: AllOptional<UserTagModel>) => Promise<{
    count: number;
  }>;
};

export const userTagRepo: IUserTagRepo = new UserTagRepo(prisma);
