import React from "react";
import { TableErrorMessage, TableStatus } from "./GraphTablePaginated";
import { Placeholders } from "../GraphComponent/Placeholders";
import styles from "./GraphTablePaginated.module.css";

type Props = {
  status: TableStatus;
  errorMessage: TableErrorMessage;
  height?: number;
};
export const TablePlaceholder = React.memo<Props>(
  ({ status, errorMessage, height }) => (
    <div
      className={styles.graph_table__placeholder}
      style={height ? { height: `${height}px` } : {}}
    >
      {status === "loading" ? (
        <Placeholders.Loading />
      ) : status === "error" ? (
        <Placeholders.Error error={errorMessage} />
      ) : (
        <div>
          Ошибка: {status} / {errorMessage}
        </div>
      )}
    </div>
  )
);
