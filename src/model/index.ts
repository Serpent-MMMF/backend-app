import {
  BookGroupSession,
  City,
  GroupSession,
  Province,
  Tag,
  User,
  UserTag,
} from "@prisma/client";
import { AllOptional, Optional, Prettify } from "../util/types";

export type UserModel = Prettify<User>;
export type CityModel = Prettify<City>;
export type ProvinceModel = Prettify<Province>;
export type TagModel = Prettify<Tag>;
export type UserTagModel = Prettify<UserTag>;
export type GroupSessionModel = Prettify<GroupSession>;
export type BookGroupSessionModel = Prettify<BookGroupSession>;

export type Model =
  | ProvinceModel
  | CityModel
  | UserModel
  | TagModel
  | UserTagModel
  | GroupSessionModel
  | BookGroupSessionModel;

/* id, createdAt, and updatedAt are optional */
export type OptionalFields = "id" | "createdAt" | "updatedAt";

export type OptionalGenerated<T extends Model> = Prettify<
  Optional<T, OptionalFields>
>;

export type OptionalUserModel = OptionalGenerated<UserModel>;
export type OptionalCityModel = OptionalGenerated<CityModel>;
export type OptionalProvinceModel = OptionalGenerated<ProvinceModel>;
export type OptionalTagModel = OptionalGenerated<TagModel>;
export type OptionalUserTagModel = OptionalGenerated<UserTagModel>;
export type OptionalGroupSessionModel = OptionalGenerated<GroupSessionModel>;
export type OptionalBookGroupSessionModel =
  OptionalGenerated<BookGroupSessionModel>;

/* Only createdAt, and updatedAt are optional */
export type OptionalNonIdField = "createdAt" | "updatedAt";
export type OptionalNonIdGenerated<T extends Model> = Prettify<
  Optional<T, OptionalNonIdField>
>;

export type OptionalNonIdUserModel = OptionalNonIdGenerated<UserModel>;
export type OptionalNonIdCityModel = OptionalNonIdGenerated<CityModel>;
export type OptionalNonIdProvinceModel = OptionalNonIdGenerated<ProvinceModel>;
export type OptionalNonIdTagModel = OptionalNonIdGenerated<TagModel>;
export type OptionalNonIdUserTagModel = OptionalNonIdGenerated<UserTagModel>;
export type OptionalNonIdGroupSessionModel =
  OptionalNonIdGenerated<GroupSessionModel>;
export type OptionalNonIdBookGroupSessionModel =
  OptionalNonIdGenerated<BookGroupSessionModel>;

/* All are optional except id (mandatory) */
export type OptionalExceptIdGenerated<T extends Model> = Prettify<
  AllOptional<T> & {
    id: string;
  }
>;

export type OptionalExceptIdUserModel = OptionalExceptIdGenerated<UserModel>;
export type OptionalExceptIdCityModel = OptionalExceptIdGenerated<CityModel>;
export type OptionalExceptIdProvinceModel =
  OptionalExceptIdGenerated<ProvinceModel>;
export type OptionalExceptIdTagModel = OptionalExceptIdGenerated<TagModel>;
export type OptionalExceptIdUserTagModel =
  OptionalExceptIdGenerated<UserTagModel>;
export type OptionalExceptIdGroupSessionModel =
  OptionalExceptIdGenerated<GroupSessionModel>;
export type OptionalExceptIdBookGroupSessionModel =
  OptionalExceptIdGenerated<BookGroupSessionModel>;
