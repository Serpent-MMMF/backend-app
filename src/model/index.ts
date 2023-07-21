import { City, Province, User } from "@prisma/client";
import { AllOptional, Optional, Prettify } from "../util/types";

export type UserModel = Prettify<User>;
export type CityModel = Prettify<City>;
export type ProvinceModel = Prettify<Province>;

export type Model =
  | ProvinceModel
  | CityModel
  | UserModel

export type OptionalFields = "id" | "createdAt" | "updatedAt";

export type OptionalGenerated<T extends Model> = Prettify<
  Optional<T, OptionalFields>
>;

export type OptionalNonIdField = "createdAt" | "updatedAt";
export type OptionalNonIdGenerated<T extends Model> = Prettify<
  Optional<T, OptionalNonIdField>
>;

export type OptionalExceptId<T extends Model> = Prettify<
  AllOptional<T> & {
    id: string;
  }
>;
