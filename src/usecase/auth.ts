import { Role, SubscriptionStatus } from "@prisma/client";
import { IUserRepo, userRepo } from "../repo/user";
import { UserModel } from "../model";

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
  register(params: IRegisterParams): Promise<UserModel>;
  login(params: ILoginParams): Promise<UserModel | null>;
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

  login(params: ILoginParams) {
    const { email, password } = params;

    return this.userRepo.findOne({
      email,
      password,
    });
  }
}

export const authUsecase: IAuthUsecase = new AuthUsecase({
  userRepo,
});
