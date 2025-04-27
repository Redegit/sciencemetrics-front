import React from "react";
import {
  FilterItem,
  FiltersForm,
  GraphTableData,
  GraphTables,
} from "../../types";
import { useForm } from "react-hook-form";
import { Graph } from "../../components/Graph";
import { request } from "../../api/request";

type OrganizationFilters = {
  keywords: "select";
  min_publications: "input";
};

export const ORGS = React.memo(() => {
  const { control, handleSubmit, reset } = useForm<
    FiltersForm<OrganizationFilters>
  >({
    defaultValues: {
      keywords: [],
      min_publications: "3",
    },
  });

  const filters: FilterItem<OrganizationFilters>[] = [
    {
      filter_type: "select",
      name: "keywords",
      label: "Ключевое слово",
      filter_api_url_search_n_pagination: "/graph/filters/keywords",
    },
    {
      name: "min_publications",
      label: "Минимум публикаций",
      filter_type: "input",
      type: "number",
      min: 1,
      defaultValue: 3,
      required: true,
    },
  ];

  const graphTables: GraphTables = {
    node: {
      title: "Публикации организации",
      columns: [
        {
          label: "Название",
          name: "title",
        },
        { label: "Журнал", name: "journal" },
        { label: "Год", name: "year" },
      ],
      getData: async ({ nodeId, page = 1 }) => {
        return (await request.get(
          `/graph/organizations/table/node?id=${nodeId}&page=${page}`
        )) as GraphTableData;
      },
    },
    link: {
      title: "Совместные публикации",
      columns: [
        { label: "Название", name: "title" },
        { label: "Журнал", name: "journal" },
        { label: "Год", name: "year" },
      ],
      getData: async ({ source, target }) => {
        return (await request.get(
          `/graph/organizations/table/link?source=${source}&target=${target}`
        )) as GraphTableData;
      },
    },
  };

  return (
    <Graph
      graphName="organizations"
      graphTables={graphTables}
      {...{ control, handleSubmit, reset, filters }}
    />
  );
});
