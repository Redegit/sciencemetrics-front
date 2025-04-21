import { ApiGraphData, FilterConfig, FiltersForm } from "../types";
import { request } from "./request";

export const getGraphData = async (
  graphName: string,
  filters: FiltersForm<FilterConfig> = {}
): Promise<ApiGraphData> => {
  console.debug(`Получение данных для графа ${graphName}. Фильтры:`, filters);
  const data = (await request.post(
    `graph/${graphName}/data`,
    filters
  )) as ApiGraphData;
  console.debug("received data:", data);

  return data;
};
