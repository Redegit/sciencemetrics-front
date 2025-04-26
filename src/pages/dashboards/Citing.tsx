import { useForm } from "react-hook-form";
import React from "react";
import { FilterItem, FiltersForm } from "../../types";
import { Graph } from "../../components/Graph";

type ReferencesFilters = {
  authors: "multi-select";
  citing_authors: "multi-select";
};

export const CITING = React.memo(() => {
  // references
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
      label: "Цитируемые авторы",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/cited_authors",
    },
    {
      name: "citing_authors",
      label: "Цитирующие авторы",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/citing_authors",
    },
  ];

  return (
    <Graph
      graphName="references"
      {...{ control, handleSubmit, reset, filters }}
      options={{ edgeSymbol: ["circle", "arrow"] }}
    />
  );
});
