import { IHandler } from "../types";
import { getCityHandler } from "./get-city";
import { getDetailCityHandler } from "./get-detail-city";

export const cityHandlers: IHandler[] = [getCityHandler, getDetailCityHandler];
