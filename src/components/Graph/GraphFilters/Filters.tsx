import React, { JSX } from "react";
import {
  Controller,
  type Control,
  type Path,
  type UseFormHandleSubmit,
} from "react-hook-form";

import { Button, ButtonGroup, Form, Stack } from "react-bootstrap";
import "./Filters.css";
import { filtersBootstrapLikeStyle } from "./FilterStyle";
import { SelectWithPagination } from "./SelectWithPagination";
import {
  FilterConfig,
  FilterItem,
  FiltersForm,
  InputFilterItem,
} from "../../../types";
import styles from "./Filters.module.css";

type Props<T extends FilterConfig> = {
  filterItems: FilterItem<T>[];
  control: Control<FiltersForm<T>>;
  onReset: () => void;
  onSubmit: (data: FiltersForm<T>) => void;
  handleSubmit: UseFormHandleSubmit<FiltersForm<T>>;
};

export const Filters = React.memo(
  <T extends FilterConfig>({
    filterItems,
    control,
    onReset,
    onSubmit,
    handleSubmit,
  }: Props<T>) => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)} className={styles.filters}>
        <Stack className={styles.filters__list}>
          {filterItems.map((filter) => (
            <Form.Group key={filter.name}>
              <Form.Label>{filter.label}</Form.Label>
              <Controller
                name={filter.name as Path<FiltersForm<T>>}
                control={control}
                render={({ field }) => {
                  switch (filter.filter_type) {
                    case "select":
                    case "multi-select":
                      return (
                        <SelectWithPagination
                          isMulti={filter.filter_type === "multi-select"}
                          name={field.name}
                          placeholder={
                            filter.filter_type === "multi-select"
                              ? "Выберите несколько..."
                              : "Выберите..."
                          }
                          closeMenuOnSelect={
                            filter.filter_type !== "multi-select"
                          }
                          styles={filtersBootstrapLikeStyle}
                          field={field}
                          filter_api_url_search_n_pagination={filter.filter_api_url_search_n_pagination}
                        />
                      );
                    case "input": {
                      return (
                        <Form.Control
                          {...field}
                          {...filter}
                          type={
                            (filter as InputFilterItem<typeof field.name>)
                              .type ?? "text"
                          }
                          placeholder={
                            (filter as InputFilterItem<typeof field.name>)
                              .placeholder
                          }
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : String(field.value ?? "")
                          }
                        />
                      );
                    }
                    default:
                      return <></>;
                  }
                }}
              />
            </Form.Group>
          ))}
        </Stack>

        <ButtonGroup className="filters__buttons">
          <Button variant="outline-secondary" onClick={onReset} type="button">
            Сбросить
          </Button>
          <Button variant="primary" type="submit">
            Применить
          </Button>
        </ButtonGroup>
      </Form>
    );
  }
) as <T extends FilterConfig>(props: Props<T>) => JSX.Element;
