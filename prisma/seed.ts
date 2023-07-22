import { CityModel, UserModel } from "../src/model";
import { Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { IRegisterParams, authUsecase } from "../src/usecase/auth";
import { prisma } from "../src/service/db";
import fs from "fs";

const clearDB = async () => {
  const ops = [
    prisma.discussion.deleteMany(),
    prisma.oneOnOne.deleteMany(),
    prisma.bookGroupSession.deleteMany(),
    prisma.groupSession.deleteMany(),
    prisma.userTag.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.user.deleteMany(),
    prisma.city.deleteMany(),
    prisma.province.deleteMany(),
  ];

  // await Promise.all(ops);
  for (const op of ops) {
    await op;
  }
};

const seedProvince = async () => {
  const seedFile = await fs.promises.readFile("./data/provinces.csv");
  const provinces = seedFile.toString().trim().split("\n");

  const data = provinces.map((province) => {
    const [id, name] = province.trim().split(",");
    return { id, name };
  });

  return prisma.province.createMany({ data });
};

const seedCity = async () => {
  const seedFile = await fs.promises.readFile("./data/cities.csv");
  const cities = seedFile.toString().trim().split("\n");

  const data = cities.map((city) => {
    const [id, provinceId, name] = city.trim().split(",");
    return { id, provinceId, name };
  });

  return prisma.city.createMany({ data });
};

const seedUsers = async (city: CityModel) => {
  const mentee: IRegisterParams = {
    name: faker.name.fullName(),
    description: faker.lorem.paragraphs({
      min: 2,
      max: 4,
    }),
    role: Role.MENTEE,
    email: "mentee@gmail.com",
    password: "password",
    cityId: city.id,
    tagIds: "",
  };
  const mentor: IRegisterParams = {
    name: faker.name.fullName(),
    description: faker.lorem.paragraphs({
      min: 2,
      max: 4,
    }),
    role: Role.MENTOR,
    email: "mentor@gmail.com",
    password: "password",
    cityId: city.id,
    tagIds: "",
  };

  return await Promise.all([
    authUsecase.register(mentee),
    authUsecase.register(mentor),
  ]);
};

const main = async () => {
  try {
    console.log("start seeding");

    console.log("clearing database");
    await clearDB();

    console.log("seeding provinces");
    const provinces = await seedProvince();

    console.log("seeding cities");
    const cities = await seedCity();

    const city = await prisma.city.findFirst();
    if (!city) {
      throw new Error("City not found");
    }

    console.log("seeding users");
    // const users = await seedUsers(city);

    console.log("finish seeding");
  } catch (err) {
    console.error(err);
  }
};

main();
