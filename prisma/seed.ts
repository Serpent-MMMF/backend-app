import { CityModel, TagModel, UserModel } from "../src/model";
import { ApprovalStatus, Role, SubscriptionStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { AuthUsecase, IRegisterParams } from "../src/usecase/auth";
import { prisma } from "../src/service/db";
import fs from "fs";
import {
  DiscussionRepo,
  OneOnOneRepo,
  TagRepo,
  UserRepo,
  UserTagRepo,
  GroupSessionRepo,
  BookGroupSessionRepo,
} from "../src/repo";
import {
  TagUsecase,
  OneOnOneUsecase,
  DiscussionUseCase,
  userUsecase,
} from "../src/usecase/";

const userRepo = new UserRepo(prisma);
const tagRepo = new TagRepo(prisma);
const userTagRepo = new UserTagRepo(prisma);
const oneOnOneRepo = new OneOnOneRepo(prisma);
const discussionRepo = new DiscussionRepo(prisma);
const groupSessionRepo = new GroupSessionRepo(prisma);
const bookGroupSessionRepo = new BookGroupSessionRepo(prisma);

const tagUsecase = new TagUsecase({
  tagRepository: tagRepo,
  userTagRepository: userTagRepo,
});
const authUsecase = new AuthUsecase({
  userRepo,
  tagUsecase,
});
const discussionUsecase = new DiscussionUseCase({
  discussionRepository: discussionRepo,
  groupSessionRepository: groupSessionRepo,
  bookGroupSessionRepository: bookGroupSessionRepo,
});
const oneOnOneUsecase = new OneOnOneUsecase({
  oneOnOneRepository: oneOnOneRepo,
});

const genUrl = () => {
  return "bit.ly/" + faker.commerce.productName().split(" ")[0];
};

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

const seedUsers = async (tags: TagModel[]) => {
  const cities = await prisma.city.findMany();
  const jakartaCities = cities.filter((c) =>
    c.name.toLowerCase().includes("jakarta")
  );
  const lenCity = cities.length;
  const lenJakartaCity = jakartaCities.length;
  if (lenCity === 0 || lenJakartaCity === 0) {
    throw new Error("city not found");
  }

  const mentee: IRegisterParams = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraphs({
      min: 2,
      max: 4,
    }),
    role: Role.MENTEE,
    email: "mentee@gmail.com",
    password: "password",
    cityId: jakartaCities[0].id,
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
    cityId: jakartaCities[0].id,
    tagIds: tags
      .filter((_) => Math.random() > 0.5)
      .map((e) => e.id)
      .join(","),
  };

  const users = Array(20)
    .fill({})
    .map((_, idx) => {
      const role = Math.random() > 0.5 ? Role.MENTOR : Role.MENTEE;
      const email = role.toLowerCase() + idx + "@gmail.com";

      const city =
        Math.random() > 0.5
          ? jakartaCities[Math.floor(Math.random() * lenJakartaCity)]
          : cities[Math.floor(Math.random() * lenCity)];

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

  const createdUsers = await Promise.all([
    authUsecase.register(mentee),
    authUsecase.register(mentor),
    ...users.map((u) => authUsecase.register(u)),
  ]);

  await Promise.all(
    createdUsers
      .filter((u) => u.role === Role.MENTOR)
      .filter(_ => Math.random() < 0.3)
      .map((u) => {
        return prisma.user.update({
          data: {
            ...u,
            subscriptionStatus: SubscriptionStatus.PREMIUM,
          },
          where: {
            id: u.id,
          },
        });
      })
  );
};

const seedGroupSession = async () => {
  const users = await prisma.user.findMany();
  const mentors = users.filter((u) => u.role === Role.MENTOR);
  const mentees = users.filter((u) => u.role === Role.MENTEE);

  const groupSessions = await Promise.all(
    mentors
      .filter((_) => Math.random() > 0.5)
      .map(async (user) => {
        const date = new Date();
        date.setDate(date.getDate() + 3);

        return prisma.groupSession.create({
          data: {
            name: "Group Session " + faker.company.name(),
            date,
            meetingUrl: genUrl(),
            mentorId: user.id,
            description: faker.lorem.paragraphs(2),
            maxParticipant: Math.floor(Math.random() * 30) + 70,
          },
        });
      })
  );

  const groupSession = await Promise.all(
    groupSessions.map(async (g) => {
      const books = await Promise.all(
        mentees
          .filter((_) => Math.random() > 0.5)
          .map((mentee) => {
            return prisma.bookGroupSession.create({
              data: {
                menteeId: mentee.id,
                sessionId: g.id,
              },
            });
          })
      );

      return {
        ...g,
        books,
      };
    })
  );

  return await Promise.all(
    groupSession.map(async (g) => {
      return await Promise.all(
        g.books.map(async (b) => {
          return prisma.discussion.create({
            data: {
              userId: b.menteeId,
              sessionId: g.id,
              content: faker.lorem.paragraph(),
            },
          });
        })
      );
    })
  );
};

const seedOneOnOne = async () => {
  const users = await prisma.user.findMany();
  const mentors = users.filter((u) => u.role === Role.MENTOR);
  const mentees = users.filter((u) => u.role === Role.MENTEE);

  const n = mentors.length > mentees.length ? mentees.length : mentors.length;

  const oneOnOnes = await Promise.all(
    Array(n)
      .fill({})
      .map((_, idx) => {
        const mentor = mentors[idx];
        const mentee = mentees[idx];

        return oneOnOneUsecase.create(
          {
            mentorId: mentor.id,
            date: Math.random() > 0.5 ? faker.date.past() : faker.date.future(),
            message: faker.lorem.paragraph(),
          },
          mentee.id
        );
      })
  );

  const respondedOneOnOnes = await Promise.all(
    oneOnOnes.map(async (o) => {
      const flag = Math.random() > 0.7 ? false : true;
      if (!flag) {
        return oneOnOneUsecase.reject(o.id, o.mentorId);
      }

      return oneOnOneUsecase.approve(
        {
          meetingUrl: genUrl(),
        },
        o.id,
        o.mentorId
      );
    })
  );

  await Promise.all(
    respondedOneOnOnes
      .filter((o) => {
        return o.approvalStatus === ApprovalStatus.APPROVED;
      })
      .map(async (o) => {
        return oneOnOneUsecase.update({
          ...o,
          review: faker.lorem.paragraph(),
          rating: Math.floor(Math.random() * 4) + 2,
        });
      })
  );

  return prisma.oneOnOne.findMany();
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

    console.log("seeding users");
    const users = await seedUsers(tags);

    console.log("seeding group session");
    const groupSession = await seedGroupSession();

    console.log("seeding one on one");
    const oneOnOnes = await seedOneOnOne();

    console.log("finish seeding");
  } catch (err) {
    console.error(err);
  }
};

main();
