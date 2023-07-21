import { PrismaClient } from "@prisma/client";
import { prisma } from "../service";
import type { CityModel, OptionalCityModel, OptionalExceptIdCityModel } from "../model";
import type { Repo } from "./base";
import { AllOptional } from "../util";

export class CityRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: OptionalCityModel) {
    return this.prisma.city.create({ data });
  }

  findMany(params?: AllOptional<CityModel>) {
    return this.prisma.city.findMany({
      where: params,
    });
  }

  findOne(params?: AllOptional<CityModel>) {
    return this.prisma.city.findFirst({
      where: params,
    });
  }

  update(data: OptionalExceptIdCityModel) {
    return this.prisma.city.update({
      where: { id: data.id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.city.delete({ where: { id } });
  }

  upsert(data: OptionalCityModel) {
    return this.prisma.city.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }
}

export type ICityRepo = Repo<CityModel> & {};

export const cityRepo: ICityRepo = new CityRepo(prisma);
