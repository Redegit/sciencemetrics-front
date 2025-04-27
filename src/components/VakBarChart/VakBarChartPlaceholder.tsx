import React from "react";
import { Placeholders } from "../Graph/GraphComponent/Placeholders";

export type ChartStatus = "loading" | "error" | "success" | "filtersEmpty";
export type ChartErrorMessage = string | null;

type Props = {
  status: ChartStatus;
  errorMessage: ChartErrorMessage;
};
export const BarChartPlaceholder = React.memo<Props>(
  ({ status, errorMessage }) => (
    <>
      {status === "loading" ? (
        <Placeholders.Loading />
      ) : status === "error" ? (
        <Placeholders.Error error={errorMessage} />
      ) : status === "filtersEmpty" ? (
        <Placeholders.FiltersEmpty />
      ) : (
        <div>
          Ошибка: {status} / {errorMessage}
        </div>
      )}
    </>
  )
);
