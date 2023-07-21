import { PrismaClient } from "@prisma/client";
import type {
  OptionalExceptIdTagModel,
  OptionalTagModel,
  TagModel,
} from "../model";
import { prisma } from "../service";
import { AllOptional } from "../util";
import type { Repo } from "./base";

export class TagRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalTagModel) {
    return this.prisma.tag.create({ data });
  }

  findMany(params?: AllOptional<TagModel>) {
    return this.prisma.tag.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<TagModel>) {
    return this.prisma.tag.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdTagModel) {
    return this.prisma.tag.update({
      where: { id: data.id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.tag.delete({ where: { id } });
  }

  upsert(data: OptionalTagModel) {
    return this.prisma.tag.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }

  findUniqueNames() {
    return this.prisma.tag.findMany({
      select: {
        name: true,
      },
      distinct: ["name"],
    });
  }
}

export type ITagRepo = Repo<TagModel> & {
  findUniqueNames: () => Promise<
    {
      name: string;
    }[]
  >;
};

export const tagRepo: ITagRepo = new TagRepo(prisma);
