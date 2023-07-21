import {
  BookGroupSession,
  City,
  GroupSession,
  Province,
  Tag,
  User,
  UserTag,
  OneOnOne,
  Discussion,
} from "@prisma/client";
import type { Prettify, Optional, AllOptional } from "../util";

export type UserModel = Prettify<User>;
export type CityModel = Prettify<City>;
export type ProvinceModel = Prettify<Province>;
export type TagModel = Prettify<Tag>;
export type UserTagModel = Prettify<UserTag>;
export type GroupSessionModel = Prettify<GroupSession>;
export type BookGroupSessionModel = Prettify<BookGroupSession>;
export type OneOnOneModel = Prettify<OneOnOne>;
export type DiscussionModel = Prettify<Discussion>;

export type Model =
  | ProvinceModel
  | CityModel
  | UserModel
  | TagModel
  | UserTagModel
  | GroupSessionModel
  | BookGroupSessionModel
  | OneOnOneModel
  | DiscussionModel;

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
export type OptionalOneOnOneModel = OptionalGenerated<OneOnOneModel>;
export type OptionalDiscussionModel = OptionalGenerated<DiscussionModel>;

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
export type OptionalNonIdOneOnOneModel = OptionalNonIdGenerated<OneOnOneModel>;
export type OptionalNonIdDiscussionModel =
  OptionalNonIdGenerated<DiscussionModel>;

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
export type OptionalExceptIdOneOnOneModel =
  OptionalExceptIdGenerated<OneOnOneModel>;
export type OptionalExceptIdDiscussionModel =
  OptionalExceptIdGenerated<DiscussionModel>;
