import { SelectFiltersApi } from "../types";
import { request } from "./request";

export const getFiltersData = async (
  filterName: string,
  query: string,
  page: number
): Promise<SelectFiltersApi> => {
  const url = `graph/filters/${filterName}?q=${query}&page=${page}`;
  const data = (await request.get(url)) as SelectFiltersApi;
  return data;
};
