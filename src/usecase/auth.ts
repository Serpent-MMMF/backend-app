import { Role, SubscriptionStatus } from "@prisma/client";
import { IUserRepo, userRepo } from "../repo/user";
import { UserModel } from "../model";
import { HttpError } from "../error";
import { ILoginData, IReqLogin, IUserDTO } from "../contract";
import { HttpStatusCode } from "../constant";
import jwt from "jsonwebtoken";
import { CONFIG, ITokenContent } from "../internal";
import { verifyHash } from "../util/hash";

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

  constructor(params: { userRepo: IUserRepo }) {
    this.userRepo = params.userRepo;
  }

  register(params: IRegisterParams) {
    const { tagIds, ...rest } = params;

    return this.userRepo.create({
      ...rest,
      imageUrl: null,
      subscriptionStatus: SubscriptionStatus.FREE,
    });
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
});
