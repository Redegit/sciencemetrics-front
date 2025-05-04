import { bench } from "vitest";
import { transformGraphApiData } from "../src/utils/transformGraphApiData";
import { request } from "../src/api/request";
import { getGraphData } from "../src/api/getGraphData";
import { FiltersForm } from "../src/types";

vi.spyOn(console, "debug").mockImplementation(() => {});

bench("Получение данных с API. 25 узлов, 61 связь", () => {
  getGraphData("authors", {
    authors: [552683],
    organizations: [],
    keywords: [],
    cities: [],
    min_publications: "1",
  } as unknown as FiltersForm<any>);
});

const data = await request.post("/graph/authors/data", {
  authors: [552683],
  organizations: [],
  keywords: [],
  cities: [],
  min_publications: "1",
});

bench("преобразование данных из API. 25 узлов, 61 связь", () => {
  transformGraphApiData(data);
});

const dataMoscow = await request.post("/graph/authors/data", {
  authors: [],
  organizations: [],
  keywords: [],
  cities: ["Москва"],
  min_publications: "3",
});

bench("преобразование данных из API. 5465 узлов, 56122 связи", () => {
  transformGraphApiData(dataMoscow);
});
