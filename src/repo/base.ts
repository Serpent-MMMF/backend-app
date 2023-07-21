import { Model, OptionalExceptIdGenerated, OptionalGenerated } from "../model";
import { AllOptional } from "../util";

export interface Repo<T extends Model> {
  create: (data: OptionalGenerated<T>) => Promise<T>;
  findMany: (params?: AllOptional<T>) => Promise<T[]>;
  findOne: (params?: AllOptional<T>) => Promise<T | null>;
  update: (data: OptionalExceptIdGenerated<T>) => Promise<T>;
  delete: (id: string) => Promise<T>;
  upsert: (data: OptionalGenerated<T>) => Promise<T>;
}
