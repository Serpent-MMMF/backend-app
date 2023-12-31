import { PrismaClient } from "@prisma/client";
import {
  GroupSessionModel,
  OptionalExceptIdGenerated,
  OptionalGenerated,
} from "../model";
import { prisma } from "../service/db";
import { AllOptional } from "../util";
import { Repo } from "./base";

export class GroupSessionRepo implements IGroupSessionRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalGenerated<GroupSessionModel>) {
    return this.prisma.groupSession.create({
      data,
    });
  }

  findMany(params?: AllOptional<GroupSessionModel>) {
    return this.prisma.groupSession.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<GroupSessionModel>) {
    return this.prisma.groupSession.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdGenerated<GroupSessionModel>) {
    return this.prisma.groupSession.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.groupSession.delete({
      where: {
        id,
      },
    });
  }

  upsert(data: OptionalGenerated<GroupSessionModel>) {
    return this.prisma.groupSession.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: data,
    });
  }

  findManyFilterDate(
    limitStartDateTime?: Date,
    limitEndDateTime?: Date,
    params?: AllOptional<GroupSessionModel>
  ) {
    const date: {
      gte?: Date;
      lte?: Date;
    } = {};
    if (limitStartDateTime) {
      date.gte = limitStartDateTime;
    }
    if (limitEndDateTime) {
      date.lte = limitEndDateTime;
    }

    return this.prisma.groupSession.findMany({
      where: {
        ...params,
        date,
      },
    });
  }
}

export type IGroupSessionRepo = Repo<GroupSessionModel> & {
  findManyFilterDate(
    limitStartDateTime?: Date,
    limitEndDateTime?: Date,
    params?: AllOptional<GroupSessionModel>
  ): Promise<GroupSessionModel[]>;
};

export const groupSessionRepo = new GroupSessionRepo(prisma);
