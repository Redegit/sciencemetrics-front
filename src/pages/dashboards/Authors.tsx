import React from "react";
import { Graph } from "../../components/Graph";
import { useForm } from "react-hook-form";
import {
  FilterItem,
  FiltersForm,
  GraphTableData,
  GraphTables,
} from "../../types";
import { request } from "../../api/request";

type AuthorsFilters = {
  authors: "multi-select";
  organizations: "multi-select";
  keywords: "multi-select";
  cities: "multi-select";
  min_publications: "input";
};

export const AUTHORS = React.memo(() => {
  const { control, handleSubmit, reset } = useForm<FiltersForm<AuthorsFilters>>({
    defaultValues: {
      authors: [],
      organizations: [],
      keywords: [],
      cities: [],
      min_publications: "3",
    },
  });

  const filters: FilterItem<AuthorsFilters>[] = [
    {
      name: "authors",
      label: "Фамилия И.О. автора",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/authors",
      column: 1,
    },
    {
      name: "organizations",
      label: "Организация",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/organizations",
      column: 1,
    },
    {
      name: "keywords",
      label: "Ключевые слова",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/keywords",
      column: 1,
    },
    {
      name: "cities",
      label: "Город",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/cities",
      column: 2,
    },
    {
      name: "min_publications",
      label: "Мин. совместных публикаций",
      filter_type: "input",
      type: "number",
      min: 1,
      column: 2,
      required: true,
    },
  ];

  const graphTables: GraphTables = {
    node: {
      title: "Публикации автора",
      columns: [
        { label: "Название", name: "title" },
        { label: "Журнал", name: "journal" },
        { label: "Год", name: "year" },
      ],
      getData: async ({ nodeId, page = 1 }) => {
        return (await request.post(
            `/graph/authors/table/node?page=${page}`,
            {
              authors: [nodeId],
              organizations: [],
              keywords: [],
              cities: [],
              min_publications: "3",
            }
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
      getData: async ({ source, target, page = 1 }) => {
        return (await request.post(
            `/graph/authors/table/link?page=${page}`,
            {
              authors: [source, target],
              organizations: [],
              keywords: [],
              cities: [],
              min_publications: "3",
            }
        )) as GraphTableData;
      },
    },
  };

  return (
      <Graph
          graphName="authors"
          graphTables={graphTables}
          {...{ control, handleSubmit, reset, filters }}
      />
  );
});
