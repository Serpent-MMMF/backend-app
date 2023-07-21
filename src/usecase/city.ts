import {
  CityModel,
  OptionalCityModel,
  OptionalExceptIdCityModel,
  OptionalNonIdCityModel,
} from "../model";
import { cityRepo, ICityRepo } from "../repo";
import { AllOptional } from "../util";

export class CityUsecase implements ICityUsecase {
  private cityRepository: ICityRepo;

  constructor(params: { cityRepository: ICityRepo }) {
    this.cityRepository = params.cityRepository;
  }

  create(data: OptionalCityModel): Promise<CityModel> {
    return this.cityRepository.create(data);
  }

  findMany(params?: AllOptional<CityModel>) {
    return this.cityRepository.findMany(params);
  }

  findById(id: string) {
    return this.cityRepository.findOne({ id });
  }

  update(data: OptionalExceptIdCityModel) {
    return this.cityRepository.update(data);
  }

  delete(id: string) {
    return this.cityRepository.delete(id);
  }
}

export type ICityUsecase = {
  create: (data: OptionalCityModel) => Promise<CityModel>;
  findMany: () => Promise<CityModel[]>;
  findById: (id: string) => Promise<CityModel | null>;
  update: (data: OptionalNonIdCityModel) => Promise<CityModel>;
  delete: (id: string) => Promise<CityModel>;
};

export const cityUsecase = new CityUsecase({
  cityRepository: cityRepo,
});
