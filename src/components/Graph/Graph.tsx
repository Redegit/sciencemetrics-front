import React, { JSX, useCallback, useEffect, useState } from "react";
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
  GraphOptions,
  GraphTables,
} from "../../types";
import { Filters } from "./GraphFilters/Filters";
import { GraphLayout } from "./GraphComponent/GraphLayout";
import { WarningModal } from "./GraphComponent/WarningModal";
import { transformGraphApiData } from "../../utils/transformGraphApiData";
import { Dashboard } from "../../hoc/Dashboard";
import { Placeholder } from "../Placeholder/Placeholder";

type Props<T extends FilterConfig> = {
  graphName: string;
  filters: FilterItem<T>[];
  control: Control<FiltersForm<T>>;
  reset: UseFormReset<FiltersForm<T>>;
  handleSubmit: UseFormHandleSubmit<FiltersForm<T>, FiltersForm<T>>;
  options?: GraphOptions;
  graphTables?: GraphTables;
};

export type GraphStatus = "loading" | "error" | "success" | "filtersEmpty";
export type ErrorMessage = string | null;

export const Graph = React.memo(
  <T extends FilterConfig>({
    graphName,
    filters,
    control,
    reset,
    handleSubmit,
    options,
    graphTables,
  }: Props<T>) => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [filtersKey, setFiltersKey] = useState(0);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const [status, setStatus] = useState<GraphStatus>("filtersEmpty");
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

    const [pendingGraphData, setPendingGraphData] =
      useState<ApiGraphData | null>(null);

    const fetchGraphData = useCallback(
      async (filterParams: FiltersForm<T>) => {
        try {
          setErrorMessage(null);
          setStatus("loading");
          const apiData = await getGraphData(graphName, filterParams);
          if (apiData.nodes.length > 1000 || apiData.links.length > 3000) {
            setPendingGraphData(apiData);
            setShowWarningModal(true);
            return;
          }
          if (apiData.nodes.length === 0) {
            setGraphData(null);
            setStatus("error");
            setErrorMessage("Похоже, что по вашим фильтрам ничего не найдено");
            return;
          }
          const graphData = transformGraphApiData(apiData);
          setGraphData(graphData);
          setStatus("success");
        } catch (err) {
          console.error("Ошибка при загрузке данных графа:", err);
          setErrorMessage("Не удалось загрузить данные для графа");
          setStatus("error");
        }
      },
      [graphName]
    );

    const applyFilters = useCallback(
      (filters: FiltersForm<T>) => {
        console.log("Применение фильтров:", filters);
        setStatus("loading");
        setErrorMessage(null);
        setGraphData(null);

        const hasActiveFilters = Object.entries(filters).some(
          ([key, value]) =>
            key !== "min_publications" &&
            (Array.isArray(value)
              ? value.length > 0
              : value !== undefined && value !== null && value !== "")
        );

        if (hasActiveFilters) {
          fetchGraphData(filters);
        } else {
          setStatus("filtersEmpty");
          setGraphData(null);
        }
      },
      [fetchGraphData]
    );

    const resetStates = useCallback(() => {
      setStatus("filtersEmpty");
      setErrorMessage(null);
      setGraphData(null);
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

    useEffect(() => {
      if (filters.length === 0) {
        fetchGraphData({} as FiltersForm<T>);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Dashboard.Body>
        {filters.length > 0 && (
          <Dashboard.Filters>
            <Filters
              key={filtersKey}
              filterItems={filters}
              control={control}
              onReset={resetFilters}
              onSubmit={applyFilters}
              handleSubmit={handleSubmit}
            />
          </Dashboard.Filters>
        )}

        <Dashboard.Layout>
          {status === "success" && graphData ? (
            <GraphLayout
              graphData={graphData}
              options={options}
              graphTables={graphTables}
            />
          ) : (
            <Placeholder status={status} errorMessage={errorMessage} fullheight />
          )}
        </Dashboard.Layout>

        <WarningModal
          showWarningModal={showWarningModal}
          handleConfirmLargeGraph={handleConfirmLargeGraph}
          pendingGraphData={pendingGraphData}
        />
      </Dashboard.Body>
    );
  }
) as <T extends FilterConfig>(props: Props<T>) => JSX.Element;
