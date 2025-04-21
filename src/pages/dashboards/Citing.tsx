import { useForm } from "react-hook-form";
import React from "react";
import { FilterItem, FiltersForm } from "../../types";
import { Graph } from "../../components/Graph";

type ReferencesFilters = {
  authors: "multi-select";
};

export const CITING = React.memo(() => { // references
  const { control, handleSubmit, reset } = useForm<
    FiltersForm<ReferencesFilters>
  >({
    defaultValues: {
      authors: [],
    },
  });

  const filters: FilterItem<ReferencesFilters>[] = [
    {
      name: "authors",
      label: "Фамилия И.О. автора",
      filter_type: "multi-select",
    },
  ];

  return (
    <Graph
      graphName="references"
      {...{ control, handleSubmit, reset, filters }}
    />
  );
});
