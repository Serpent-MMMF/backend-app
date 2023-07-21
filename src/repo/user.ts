import { PrismaClient } from "@prisma/client";
import {
  OptionalExceptIdGenerated,
  OptionalGenerated,
  UserModel,
} from "../model";
import { prisma } from "../service/db";
import { AllOptional } from "../util";
import { Repo } from "./base";

export class UserRepo implements IUserRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalGenerated<UserModel>) {
    return this.prisma.user.create({
      data,
    });
  }

  findMany(params?: AllOptional<UserModel>) {
    return this.prisma.user.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<UserModel>) {
    return this.prisma.user.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdGenerated<UserModel>) {
    return this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  upsert(data: OptionalGenerated<UserModel>) {
    return this.prisma.user.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: data,
    });
  }
}

export type IUserRepo = Repo<UserModel>;

export const userRepo = new UserRepo(prisma);
