import React from "react";
import { ErrorMessage, GraphStatus } from "../Graph";
import styles from "./GraphLayout.module.css";

const Placeholders = {
  FiltersEmpty: () => (
    <div className={styles.error}>
      <p>Пожалуйста, примените хотя бы один фильтр</p>
    </div>
  ),
  Error: ({ error }: { error: ErrorMessage }) => (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  ),
  Loading: () => <div className={styles.loading}>Загрузка данных...</div>,
};

type Props = {
  status: GraphStatus;
  errorMessage: ErrorMessage;
};
export const GraphPlaceholder = React.memo<Props>(
  ({ status, errorMessage }) => {
    let PlaceholderComponent;

    switch (status) {
      case "loading":
        PlaceholderComponent = Placeholders.Loading;
        break;
      case "error":
        PlaceholderComponent = () => (
          <Placeholders.Error error={errorMessage} />
        );
        break;
      case "filtersEmpty":
        PlaceholderComponent = Placeholders.FiltersEmpty;
        break;
      default:
        PlaceholderComponent = () => <div>{status}</div>;
    }

    return PlaceholderComponent ? <PlaceholderComponent /> : null;
  }
);
