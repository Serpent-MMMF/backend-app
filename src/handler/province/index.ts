import { IHandler } from "../types";
import { getDetailProvinceHandler } from "./get-detail-province";
import { getProvinceHandler } from "./get-province";

export const provinceHandlers: IHandler[] = [
  getProvinceHandler,
  getDetailProvinceHandler,
];
