import React from "react";
import { FilterItem, FiltersForm } from "../../types";
import { useForm } from "react-hook-form";
import { Graph } from "../../components/Graph";

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

  return (
    <Graph
      graphName="organizations"
      {...{ control, handleSubmit, reset, filters }}
    />
  );
});
