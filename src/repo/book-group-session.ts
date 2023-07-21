import { PrismaClient } from "@prisma/client";
import {
  BookGroupSessionModel,
  OptionalExceptIdGenerated,
  OptionalGenerated,
} from "../model";
import { prisma } from "../service/db";
import { AllOptional } from "../util";
import { Repo } from "./base";

export class BookGroupSessionRepo implements IBookGroupSessionRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalGenerated<BookGroupSessionModel>) {
    return this.prisma.bookGroupSession.create({
      data,
    });
  }

  findMany(params?: AllOptional<BookGroupSessionModel>) {
    return this.prisma.bookGroupSession.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<BookGroupSessionModel>) {
    return this.prisma.bookGroupSession.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdGenerated<BookGroupSessionModel>) {
    return this.prisma.bookGroupSession.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.bookGroupSession.delete({
      where: {
        id,
      },
    });
  }

  upsert(data: OptionalGenerated<BookGroupSessionModel>) {
    return this.prisma.bookGroupSession.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: data,
    });
  }
}

export type IBookGroupSessionRepo = Repo<BookGroupSessionModel>;

export const bookGroupSessionRepo = new BookGroupSessionRepo(prisma);
