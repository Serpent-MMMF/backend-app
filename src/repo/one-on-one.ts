import { PrismaClient } from "@prisma/client";
import { prisma } from "../service";
import type { OneOnOneModel, OptionalExceptIdOneOnOneModel, OptionalOneOnOneModel } from "../model";
import type { Repo } from "./base";
import { AllOptional } from "../util";

export class OneOnOneRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalOneOnOneModel) {
    return this.prisma.oneOnOne.create({ data });
  }

  findMany(params?: AllOptional<OneOnOneModel>) {
    return this.prisma.oneOnOne.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<OneOnOneModel>) {
    return this.prisma.oneOnOne.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdOneOnOneModel) {
    return this.prisma.oneOnOne.update({
      where: { id: data.id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.oneOnOne.delete({ where: { id } });
  }

  upsert(data: OptionalOneOnOneModel) {
    return this.prisma.oneOnOne.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }
}

export type IOneOnOneRepo = Repo<OneOnOneModel>;

export const oneOnOneRepo: IOneOnOneRepo = new OneOnOneRepo(prisma);
