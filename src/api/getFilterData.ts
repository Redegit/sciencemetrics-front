import { SelectFiltersApi } from "../types";
import { request } from "./request";

export const getFiltersData = async (
  url: string,
  query: string,
  page: number
): Promise<SelectFiltersApi> => {
  const url_with_query = `${url}?q=${encodeURIComponent(query)}&page=${page}`;

  const data = (await request.get(url_with_query)) as SelectFiltersApi;
  return data;
};
