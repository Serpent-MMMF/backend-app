import { SubscriptionStatus } from "@prisma/client";
import { HttpStatusCode } from "../constant";
import { IQuerySearchUser } from "../contract";
import { HttpError } from "../error";
import {
  OptionalExceptIdUserModel,
  OptionalNonIdUserModel,
  OptionalUserModel,
  UserModel,
} from "../model";
import {
  ICityRepo,
  IUserRepo,
  IUserTagRepo,
  cityRepo,
  userRepo,
  userTagRepo,
} from "../repo";
import { prisma } from "../service";
import { AllOptional } from "../util";

export class UserUsecase implements IUserUsecase {
  private userRepository: IUserRepo;
  private cityRepository: ICityRepo;
  private userTagRepository: IUserTagRepo;

  constructor(params: {
    userRepository: IUserRepo;
    cityRepository: ICityRepo;
    userTagRepository: IUserTagRepo;
  }) {
    this.userRepository = params.userRepository;
    this.cityRepository = params.cityRepository;
    this.userTagRepository = params.userTagRepository;
  }

  async create(data: OptionalUserModel): Promise<UserModel> {
    const user = await this.userRepository.create(data);
    return user;
  }

  async findMany(params?: AllOptional<UserModel>) {
    return this.userRepository.findMany(params);
  }

  async findById(id: string) {
    return this.userRepository.findOne({ id });
  }

  async update(data: OptionalExceptIdUserModel) {
    return this.userRepository.update(data);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  async search(params: IQuerySearchUser, userId: string) {
    const tagIds = (params.tagIds || "").split(",");

    const user = await this.findById(userId);
    if (!user) {
      throw new HttpError(HttpStatusCode.NotFound, new Error("User not found"));
    }

    const city = await this.cityRepository.findOne({ id: user.cityId });
    if (!city) {
      throw new HttpError(HttpStatusCode.NotFound, new Error("City not found"));
    }

    let users = await this.userRepository.findMany({
      role: params.role,
      subscriptionStatus: params.premiumOnly
        ? SubscriptionStatus.PREMIUM
        : undefined,
    });

    users = users.filter((user) => user.id !== userId);

    const data = await Promise.all(
      users.map(async (user) => {
        const [userTags, userCity] = await Promise.all([
          this.userTagRepository.findMany({ userId: user.id }),
          this.cityRepository.findOne({ id: user.cityId }),
        ]);

        return {
          user,
          userTags: userTags,
          city: userCity,
        };
      })
    );

    const filteredProvince = data.filter((user) => {
      if (!params.onMyProvince) {
        return true;
      }
      if (!user.city) {
        return false;
      }
      return user.city.provinceId === city.provinceId;
    });
    const filteredCity = filteredProvince.filter((user) => {
      if (!params.onMyCity) {
        return true;
      }
      if (!user.city) {
        return false;
      }
      return user.city.id === city.id;
    });
    const filteredTags = filteredCity.filter((user) => {
      if (!params.tagIds) {
        return true;
      }

      const userTagIds = user.userTags.map((userTag) => userTag.tagId);
      return tagIds.some((tagId) => userTagIds.includes(tagId));
    });

    return filteredTags.map((datum) => datum.user);
  }

  async searchGuest(params: IQuerySearchUser) {
    let users = undefined;
    if (params.tagIds) {
      users = await prisma.user.findMany({
        where: {
          role: params.role,
          subscriptionStatus: params.premiumOnly
            ? SubscriptionStatus.PREMIUM
            : undefined,
          UserTag: {
            every: {
              tagId: {
                in: params.tagIds.split(","),
              },
            },
          },
        },
      });
    } else {
      users = await this.findMany({
        role: params.role,
        subscriptionStatus: params.premiumOnly
          ? SubscriptionStatus.PREMIUM
          : undefined,
      });
    }

    return users;
  }
}

export type IUserUsecase = {
  create: (data: OptionalUserModel) => Promise<UserModel>;
  findMany: () => Promise<UserModel[]>;
  findById: (id: string) => Promise<UserModel | null>;
  update: (data: OptionalNonIdUserModel) => Promise<UserModel>;
  delete: (id: string) => Promise<UserModel>;
  search: (params: IQuerySearchUser, userId: string) => Promise<UserModel[]>;
};

export const userUsecase = new UserUsecase({
  userRepository: userRepo,
  cityRepository: cityRepo,
  userTagRepository: userTagRepo,
});
