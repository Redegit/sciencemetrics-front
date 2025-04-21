import React, { JSX, useCallback, useState } from "react";
import type {
  Control,
  UseFormHandleSubmit,
  UseFormReset,
} from "react-hook-form";
import { getGraphData } from "../../api/getGraphData";
import {
  ApiGraphData,
  FilterConfig,
  FilterItem,
  FiltersForm,
  GraphData,
} from "../../types";
import { Filters } from "./GraphFilters/Filters";
import { GraphLayout } from "./GraphComponent/GraphLayout";
import { GraphPlaceholders } from "./GraphComponent/GraphPlaceholders";
import { WarningModal } from "./GraphComponent/WarningModal";
import { transformGraphApiData } from "../../utils/transformGraphApiData";
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";

type Props<T extends FilterConfig> = {
  graphName: string;
  filters: FilterItem<T>[];
  control: Control<FiltersForm<T>>;
  reset: UseFormReset<FiltersForm<T>>;
  handleSubmit: UseFormHandleSubmit<FiltersForm<T>, FiltersForm<T>>;
};

export const Graph = React.memo(
  <T extends FilterConfig>({
    graphName,
    filters,
    control,
    reset,
    handleSubmit,
  }: Props<T>) => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filtersEmpty, setFiltersEmpty] = useState<boolean>(true);
    const [filtersKey, setFiltersKey] = useState(0);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [pendingGraphData, setPendingGraphData] =
      useState<ApiGraphData | null>(null);

    const fetchGraphData = useCallback(
      async (filterParams: FiltersForm<T>) => {
        try {
          setLoading(true);
          setError(null);
          const apiData = await getGraphData(graphName, filterParams);
          if (apiData.nodes.length > 1000 || apiData.links.length > 3000) {
            setPendingGraphData(apiData);
            setShowWarningModal(true);
            setLoading(false);
            return;
          }
          const graphData = transformGraphApiData(apiData);
          setGraphData(graphData);
          setError(null);
        } catch (err) {
          console.error("Ошибка при загрузке данных графа:", err);
          setError("Не удалось загрузить данные для графа");
        } finally {
          setLoading(false);
        }
      },
      [graphName]
    );

    const applyFilters = useCallback(
      (filters: FiltersForm<T>) => {
        console.log("Применение фильтров:", filters);
        const hasActiveFilters = Object.values(filters).some((filterValue) =>
          Array.isArray(filterValue)
            ? filterValue.length > 0
            : filterValue !== undefined &&
              filterValue !== null &&
              filterValue !== ""
        );

        if (hasActiveFilters) {
          setFiltersEmpty(false);
          fetchGraphData(filters);
        } else {
          setFiltersEmpty(true);
          setGraphData(null);
        }
      },
      [fetchGraphData]
    );
    const resetStates = useCallback(() => {
      setLoading(false);
      setGraphData(null);
      setError(null);
      setFiltersEmpty(true);
    }, []);

    const resetFilters = useCallback(() => {
      reset();
      setFiltersKey((prevKey) => prevKey + 1);
      resetStates();
    }, [reset, resetStates]);

    const handleConfirmLargeGraph = useCallback(
      (confirmed: boolean) => {
        setShowWarningModal(false);
        if (confirmed && pendingGraphData) {
          setGraphData(transformGraphApiData(pendingGraphData));
        } else {
          resetStates();
        }
        setPendingGraphData(null);
      },
      [pendingGraphData, resetStates]
    );

    return (
      <>
        {filters.length > 0 && (
          <Filters
            key={filtersKey}
            filterItems={filters}
            control={control}
            onReset={resetFilters}
            onSubmit={applyFilters}
            handleSubmit={handleSubmit}
          />
        )}

        <DashboardLayoutContainer>
          {filtersEmpty && <GraphPlaceholders.FiltersEmpty />}

          {error && <GraphPlaceholders.Error error={error} />}

          {loading && <GraphPlaceholders.Loading />}

          {graphData && !loading && !error && (
            <GraphLayout
              nodes={graphData.nodes}
              links={graphData.links}
              categories={graphData.categories}
              title={graphData.title}
              name={graphData.name}
            />
          )}
        </DashboardLayoutContainer>

        <WarningModal
          showWarningModal={showWarningModal}
          handleConfirmLargeGraph={handleConfirmLargeGraph}
          pendingGraphData={pendingGraphData}
        />
      </>
    );
  }
) as <T extends FilterConfig>(props: Props<T>) => JSX.Element;
