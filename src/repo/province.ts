import { PrismaClient } from "@prisma/client";
import { prisma } from "../service";
import type { ProvinceModel, OptionalProvinceModel, OptionalExceptIdProvinceModel } from "../model";
import type { Repo } from "./base";
import { AllOptional } from "../util";

export class ProvinceRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalProvinceModel) {
    return this.prisma.province.create({ data });
  }

  findMany(params?: AllOptional<ProvinceModel>) {
    return this.prisma.province.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<ProvinceModel>) {
    return this.prisma.province.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdProvinceModel) {
    return this.prisma.province.update({
      where: { id: data.id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.province.delete({ where: { id } });
  }

  upsert(data: OptionalProvinceModel) {
    return this.prisma.province.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }
}

export type IProvinceRepo = Repo<ProvinceModel> & {};

export const provinceRepo: IProvinceRepo = new ProvinceRepo(prisma);
