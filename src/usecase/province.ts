import {
  OptionalExceptIdProvinceModel,
  OptionalNonIdProvinceModel,
  OptionalProvinceModel,
  ProvinceModel,
} from "../model";
import { IProvinceRepo, provinceRepo } from "../repo";
import { AllOptional } from "../util";

export class ProvinceUsecase implements IProvinceUsecase {
  private provinceRepository: IProvinceRepo;

  constructor(params: { provinceRepository: IProvinceRepo }) {
    this.provinceRepository = params.provinceRepository;
  }

  create(data: OptionalProvinceModel): Promise<ProvinceModel> {
    return this.provinceRepository.create(data);
  }

  findMany(params?: AllOptional<ProvinceModel>) {
    return this.provinceRepository.findMany(params);
  }

  findById(id: string) {
    return this.provinceRepository.findOne({ id });
  }

  update(data: OptionalExceptIdProvinceModel) {
    return this.provinceRepository.update(data);
  }

  delete(id: string) {
    return this.provinceRepository.delete(id);
  }
}

export type IProvinceUsecase = {
  create: (data: OptionalProvinceModel) => Promise<ProvinceModel>;
  findMany: () => Promise<ProvinceModel[]>;
  findById: (id: string) => Promise<ProvinceModel | null>;
  update: (data: OptionalNonIdProvinceModel) => Promise<ProvinceModel>;
  delete: (id: string) => Promise<ProvinceModel>;
};

export const provinceUsecase = new ProvinceUsecase({
  provinceRepository: provinceRepo,
});
