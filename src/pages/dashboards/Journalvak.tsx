import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FilterItem, FiltersForm, VakChartData } from "../../types";
import { Filters } from "../../components/Graph/GraphFilters/Filters";
import { BarChart } from "../../components/BarChart/BarChart";
import { request } from "../../api/request";
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import {
  BarChartPlaceholder,
  ChartErrorMessage,
  ChartStatus,
} from "../../components/BarChart/BarChartPlaceholder";

type AuthorArticlesFilters = {
  authors: "select";
  years_range: "year_range";
};

export const JOURNALVAK = React.memo(() => {
  const [chartData, setChartData] = useState<VakChartData | null>(null);
  const [filtersKey, setFiltersKey] = useState(0);

  const [status, setStatus] = useState<ChartStatus>("filtersEmpty");
  const [errorMessage, setErrorMessage] = useState<ChartErrorMessage>(null);

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
      filter_type: "select",
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

  const transformFilters = (filters: FiltersForm<AuthorArticlesFilters>) => {
    const transformedFilters = {
      authorid: filters.authors[0],
      date_from: filters.years_range.from + "-01-01",
      date_to: filters.years_range.to + "-12-31",
    };
    return transformedFilters;
  };

  const fetchChartData = useCallback(
    async (filters: FiltersForm<AuthorArticlesFilters>) => {
      try {
        setErrorMessage(null);
        setChartData(null);
        setStatus("loading");

        const transformedFilters = transformFilters(filters);
        const data = (await request.get(
          `/statistics/vak-categories?authorid=${transformedFilters.authorid}&date_from=${transformedFilters.date_from}&date_to=${transformedFilters.date_to}`
        )) as VakChartData;

        if (Object.keys(data).length == 0) {
          setChartData(null);
          setStatus("error");
          setErrorMessage("Похоже, что по вашим фильтрам ничего не найдено");
          return;
        }

        setChartData(data);
        setStatus("success");
      } catch (error) {
        setErrorMessage("Ошибка при загрузке данных");
        setStatus("error");
      }
    },
    []
  );

  const resetStates = useCallback(() => {
    setStatus("filtersEmpty");
    setErrorMessage(null);
    setChartData(null);
  }, []);

  const resetFilters = useCallback(() => {
    reset();
    setFiltersKey((prevKey) => prevKey + 1);
    resetStates();
  }, [reset, resetStates]);

  const applyFilters = useCallback(
    (filters: FiltersForm<AuthorArticlesFilters>) => {
      console.log("Применение фильтров:", filters);
      setStatus("loading");
      setErrorMessage(null);
      setChartData(null);

      const hasActiveFilters =
        filters.authors.length > 0 &&
        filters.years_range.from !== null &&
        filters.years_range.to !== null;

      if (hasActiveFilters) {
        fetchChartData(filters);
      } else {
        setStatus("filtersEmpty");
        setChartData(null);
      }
    },
    [fetchChartData]
  );

  return (
    <>
      <Filters
        key={filtersKey}
        filterItems={filters}
        control={control}
        onReset={resetFilters}
        onSubmit={applyFilters}
        handleSubmit={handleSubmit}
      />
      <DashboardLayoutContainer>
        {status === "success" && chartData ? (
          <BarChart data={chartData} />
        ) : (
          <BarChartPlaceholder status={status} errorMessage={errorMessage} />
        )}
      </DashboardLayoutContainer>
    </>
  );
});
