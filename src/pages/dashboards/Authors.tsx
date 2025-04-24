import React from "react";
import { Graph } from "../../components/Graph";
import { useForm } from "react-hook-form";
import { FilterItem, FiltersForm } from "../../types";

type AuthorsFilters = {
  authors: "multi-select";
  organizations: "multi-select";
  keywords: "multi-select";
  cities: "multi-select";
};

export const AUTHORS = React.memo(() => {
  const { control, handleSubmit, reset } = useForm<FiltersForm<AuthorsFilters>>(
    {
      defaultValues: {
        authors: [],
        organizations: [],
        keywords: [],
        cities: [],
      },
    }
  );

  const filters: FilterItem<AuthorsFilters>[] = [
    {
      name: "authors",
      label: "Фамилия И.О. автора",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/authors",
    },
    {
      name: "organizations",
      label: "Организация",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/organizations",
    },
    {
      name: "keywords",
      label: "Ключевые слова",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/keywords",
    },
    {
      name: "cities",
      label: "Город",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/cities",
    },
  ];

  return (
    <Graph graphName="authors" {...{ control, handleSubmit, reset, filters }} />
  );
});
