import React from "react";
import { ErrorMessage, GraphStatus } from "../Graph";
import { Placeholders } from "./Placeholders";

type Props = {
  status: GraphStatus;
  errorMessage: ErrorMessage;
};
export const GraphPlaceholder = React.memo<Props>(
  ({ status, errorMessage }) => {
    switch (status) {
      case "loading":
        return <Placeholders.Loading />;
      case "error":
        return <Placeholders.Error error={errorMessage} />;
      case "filtersEmpty":
        return <Placeholders.FiltersEmpty />;
      default:
        return <div>{status}</div>;
    }
  }
);
