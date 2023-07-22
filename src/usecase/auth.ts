import { Role, SubscriptionStatus } from "@prisma/client";
import { IUserRepo, userRepo } from "../repo/user";
import { UserModel } from "../model";
import { HttpError } from "../error";
import { ILoginData, IReqLogin, IUserDTO } from "../contract";
import { HttpStatusCode } from "../constant";
import jwt from "jsonwebtoken";
import { CONFIG, ITokenContent } from "../internal";
import { verifyHash, hash } from "../util/hash";
import { ITagRepo } from "../repo";
import { ITagUsecase, tagUsecase } from "./tag";

export type IRegisterParams = {
  description: string;
  password: string;
  name: string;
  role: Role;
  email: string;
  cityId: string;
  tagIds: string;
};

export type ILoginParams = {
  email: string;
  password: string;
};

export type IAuthUsecase = {
  login: (params: IReqLogin) => Promise<ILoginData>;
  register: (params: IRegisterParams) => Promise<IUserDTO>;
};

export class AuthUsecase implements IAuthUsecase {
  private userRepo: IUserRepo;
  private tagUsecase: ITagUsecase;

  constructor(params: { userRepo: IUserRepo; tagUsecase: ITagUsecase }) {
    this.userRepo = params.userRepo;
    this.tagUsecase = params.tagUsecase;
  }

  async register(params: IRegisterParams) {
    const { password, tagIds, ...rest } = params;
    const { hashed } = await hash(password);

    const user = await this.userRepo.create({
      imageUrl: null,
      ...rest,
      password: hashed,
      subscriptionStatus: SubscriptionStatus.FREE,
    });

    const tagIdsArr = tagIds.split(",");
    await this.tagUsecase.upsertUserTag(tagIdsArr, user.id);

    const { password: p, ...userDTO } = user;

    return userDTO;
  }

  async login({ email, password }: ILoginParams) {
    const user = await this.userRepo.findOne({
      email,
    });

    if (!user) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("User not found")
      );
    }

    const isMatch = await verifyHash(password, user.password);

    if (!isMatch) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        new Error("Invalid credentials")
      );
    }

    const tokenContent: ITokenContent = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(tokenContent, CONFIG.JWT_SECRET);

    const { password: p, ...userDTO } = user;

    return {
      token,
      user: userDTO,
    };
  }
}

export const authUsecase: IAuthUsecase = new AuthUsecase({
  userRepo,
  tagUsecase,
});
