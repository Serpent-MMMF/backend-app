import { CityModel, TagModel, UserModel } from "../src/model";
import { Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { AuthUsecase, IRegisterParams } from "../src/usecase/auth";
import { prisma } from "../src/service/db";
import fs from "fs";
import { TagRepo, UserRepo, UserTagRepo } from "../src/repo";
import { TagUsecase } from "../src/usecase/tag";

const userRepo = new UserRepo(prisma);
const tagRepo = new TagRepo(prisma);
const userTagRepo = new UserTagRepo(prisma);
const tagUsecase = new TagUsecase({
  tagRepository: tagRepo,
  userTagRepository: userTagRepo,
});
const authUsecase = new AuthUsecase({
  userRepo,
  tagUsecase,
});

const TAGS = [
  "Software Engineering",
  "Data Science",
  "UI/UX",
  "Product Management",
  "Business",
  "Marketing",
  "Finance",
  "Design",
  "Human Resources",
  "Sales",
  "Customer Service",
  "Operations",
  "Legal",
  "Education",
  "Healthcare",
  "Construction",
  "Real Estate",
  "Architecture",
];

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

const seedUsers = async (city: CityModel, tags: TagModel[]) => {
  const mentee: IRegisterParams = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraphs({
      min: 2,
      max: 4,
    }),
    role: Role.MENTEE,
    email: "mentee@gmail.com",
    password: "password",
    cityId: city.id,
    tagIds: tags
      .filter((_) => Math.random() > 0.5)
      .map((e) => e.id)
      .join(","),
  };
  const mentor: IRegisterParams = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraphs({
      min: 2,
      max: 4,
    }),
    role: Role.MENTOR,
    email: "mentor@gmail.com",
    password: "password",
    cityId: city.id,
    tagIds: tags
      .filter((_) => Math.random() > 0.5)
      .map((e) => e.id)
      .join(","),
  };

  const users = Array(100)
    .fill({})
    .map((_, idx) => {
      const role = Math.random() > 0.5 ? Role.MENTOR : Role.MENTEE;
      const email = role.toLowerCase() + idx + "@gmail.com";

      return {
        name: faker.person.fullName(),
        description: faker.lorem.paragraphs({
          min: 2,
          max: 4,
        }),
        role,
        email,
        password: "password",
        cityId: city.id,
        tagIds: tags
          .filter((_) => Math.random() > 0.5)
          .map((e) => e.id)
          .join(","),
      };
    });

  return await Promise.all([
    authUsecase.register(mentee),
    authUsecase.register(mentor),
    ...users.map(authUsecase.register),
  ]);
};

const seedTag = async () => {
  const data = TAGS.map((tag) => ({ name: tag }));
  await prisma.tag.createMany({ data });

  return prisma.tag.findMany();
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

    console.log("seeding tag");
    const tags = await seedTag();

    const city = await prisma.city.findFirst();
    if (!city) {
      throw new Error("City not found");
    }

    console.log("seeding users");
    const users = await seedUsers(city, tags);

    console.log("finish seeding");
  } catch (err) {
    console.error(err);
  }
};

main();
