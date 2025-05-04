import { ApiGraphData } from "../types";
import { transformGraphApiData } from "./transformGraphApiData";

describe("transformGraphApiData", () => {
  it("должна корректно трансформировать данные графа из API в формат визуализации", () => {
    const input: ApiGraphData = {
      nodes: [
        {
          id: "n1",
          name: ["Иванов Иван Иванович", "Иванов И. И."],
          value: 10,
          category: 0,
        },
        { id: "n2", name: "Капустин", value: 5, category: 1 },
      ],
      links: [{ source: "n1", target: "n2", weight: 2 }],
      categories: [{ name: "Authors" }, { name: "Institutions" }],
    };

    const output = transformGraphApiData(input);

    expect(output.nodes).toHaveLength(2);
    expect(output.links).toHaveLength(1);
    expect(output.categories).toEqual([
      {
        itemStyle: {
          color: "#2273b0",
        },
        name: "Authors",
      },
      {
        itemStyle: {
          color: "#F0A46E",
        },
        name: "Institutions",
      },
    ]);

    expect(output.nodes[0]).toMatchObject({
      id: "n1",
      name: "Иванов Иван Иванович",
      aliases: ["Иванов И. И."],
      category: 0,
      value: 10,
      scale: expect.any(Number),
      symbolSize: expect.any(Number),
    });

    expect(output.links[0]).toEqual({
      source: "n1",
      target: "n2",
      weight: 2,
    });
  });
});
