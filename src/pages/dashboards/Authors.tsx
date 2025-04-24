import React from "react";
import { Graph } from "../../components/Graph";
import { useForm } from "react-hook-form";
import { FilterItem, FiltersForm } from "../../types";

type AuthorsFilters = {
  authors: "multi-select";
  organizations: "multi-select";
  keywords: "multi-select";
  cities: "multi-select";
  min_publications: "input";
};

export const AUTHORS = React.memo(() => {
  const { control, handleSubmit, reset } = useForm<FiltersForm<AuthorsFilters>>(
    {
      defaultValues: {
        authors: [],
        organizations: [],
        keywords: [],
        cities: [],
        min_publications: "3", // string is used for number input
      },
    }
  );

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
      defaultValue: 3,
      column: 2,
      required: true,
    },
  ];

  return (
    <Graph graphName="authors" {...{ control, handleSubmit, reset, filters }} />
  );
});
