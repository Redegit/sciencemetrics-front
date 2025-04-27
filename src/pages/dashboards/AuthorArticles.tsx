import React from "react";
import { useForm } from "react-hook-form";
import { FilterItem, FiltersForm } from "../../types";
import { Filters } from "../../components/Graph/GraphFilters/Filters";

type AuthorArticlesFilters = {
  authors: "multi-select";
  years_range: "year_range";
};

export const AUTHOR_ARTICLES = React.memo(() => {
  const { control, handleSubmit, reset } = useForm<
    FiltersForm<AuthorArticlesFilters>
  >({
    defaultValues: {
      authors: [],
      years_range: { from: 1950, to: 2025 },
    },
  });

  const filters: FilterItem<AuthorArticlesFilters>[] = [
    {
      name: "authors",
      label: "Фамилия И.О. автора",
      filter_type: "multi-select",
      filter_api_url_search_n_pagination: "/graph/filters/authors",
      column: 1,
    },
    {
      name: "years_range",
      label: "Год публикации",
      filter_type: "year_range",
      min: 1950,
      max: 2025,
      column: 1,
    },
  ];

  const mockData = {
    specialization1: { k1: 10, k2: 20, k3: 15, k4: 5 },
    specialization2: { k1: 5, k2: 25, k3: 10, k4: 8 },
    specialization3: { k1: 12, k2: 18, k3: 22, k4: 11 },
  };


  const resetFilters = () => {
    console.log("reset");
  };

  const applyFilters = (data: FiltersForm<AuthorArticlesFilters>) => {
    console.log("apply", data);
  };

  return (
    <>
      <Filters
        filterItems={filters}
        control={control}
        onReset={resetFilters}
        onSubmit={applyFilters}
        handleSubmit={handleSubmit}
      />
    </>
  );
});
