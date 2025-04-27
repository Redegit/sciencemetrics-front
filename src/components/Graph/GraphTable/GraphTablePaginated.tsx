import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ClickedItem,
  ClickedItemType,
  GraphTable,
  GraphTableData,
  GraphTables,
} from "../../../types";
import { TablePlaceholder } from "./GraphTablePlaceholders";
import { Table } from "react-bootstrap";
import styles from "./GraphTablePaginated.module.css";

type Props<T extends ClickedItemType> = {
  tablesOptions: GraphTables;
  clickedItem: ClickedItem<T>;
};

export type TableStatus = "loading" | "error" | "success";
export type TableErrorMessage = string | null;

export const GraphTablePaginated = React.memo(
  <T extends ClickedItemType>({ tablesOptions, clickedItem }: Props<T>) => {
    const [status, setStatus] = useState<TableStatus>("loading");
    const [errorMessage, setErrorMessage] = useState<TableErrorMessage>(null);

    const [tableData, setTableData] = useState<GraphTableData | null>(null);
    const [page, setPage] = useState(1);

    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const [placeholderHeight, setPlaceholderHeight] = useState<number>(0);

    const fetchTableData = useCallback(async () => {
      try {
        setErrorMessage(null);
        setTableData(null);
        setStatus("loading");
        const table = tablesOptions[clickedItem.type] as
          | GraphTable<T>
          | undefined;
        const data = await table?.getData({ ...clickedItem.params, page });
        setTableData(data || { items: [], hasMore: false });
        setStatus("success");
      } catch (error) {
        setErrorMessage("Ошибка при загрузке данных");
        setStatus("error");
      }
    }, [tablesOptions, clickedItem, page]);

    useEffect(() => {
      if (tbodyRef.current && tbodyRef.current.offsetHeight) {
        setPlaceholderHeight(tbodyRef.current.offsetHeight);
      }
    }, [tableData]);

    useEffect(() => {
      setPage(1);
    }, [clickedItem]);

    useEffect(() => {
      fetchTableData();
    }, [fetchTableData]);

    const onLineClink = (link: string) => {
      if (!link) return;
      window.open(link, "_blank");
    };

    return (
      <div className={styles.graph_table__container}>
        <>
          <Table striped bordered hover className={styles.graph__table}>
            <thead>
              <tr>
                {tablesOptions[clickedItem.type]?.columns.map((column) => (
                  <th key={column.name}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {tableData?.items.map((item) => (
                <tr key={item.key} onClick={() => onLineClink(item.link || "")}>
                  {tablesOptions[clickedItem.type]?.columns.map((column) => (
                    <td key={`${column.name}:${item.key}`}>
                      {item[column.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          {status !== "success" && (
            <TablePlaceholder
              height={placeholderHeight}
              status={status}
              errorMessage={errorMessage}
            />
          )}
          <Pagination
            page={page}
            setPage={setPage}
            hasMore={tableData?.hasMore}
          />
        </>
      </div>
    );
  }
);

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore?: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  hasMore,
}) => {
  return (
    <div className={styles.pagination_container}>
      <button
        className={`${styles.page_button} ${page === 1 ? styles.disabled : ""}`}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Назад
      </button>
      <span className={styles.page_number}>{page}</span>
      <button
        className={`${styles.page_button} ${!hasMore ? styles.disabled : ""}`}
        onClick={() => setPage((prev) => prev + 1)}
        disabled={!hasMore}
      >
        Вперед
      </button>
    </div>
  );
};
