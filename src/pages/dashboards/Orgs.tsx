import React from "react";
import { FilterItem, FiltersForm } from "../../types";
import { useForm } from "react-hook-form";
import { Graph } from "../../components/Graph";

type OrganizationFilters = {
  keywords: "select";
  min_common_publications: "input";
};

export const ORGS = React.memo(() => {
  const { control, handleSubmit, reset } = useForm<
    FiltersForm<OrganizationFilters>
  >({
    defaultValues: {
      keywords: [],
      min_common_publications: 3,
    },
  });

  const filters: FilterItem<OrganizationFilters>[] = [
    {
      filter_type: "select",
      name: "keywords",
      label: "Ключевые слова",
    },
    {
      filter_type: "input",
      type: "number",
      name: "min_common_publications",
      label: "Минимальное количество совместных публикаций",
      min: 1,
    },
  ];

  return (
    <Graph
      graphName="organizations"
      {...{ control, handleSubmit, reset, filters }}
    />
  );
});
