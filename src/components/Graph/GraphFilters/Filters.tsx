import React, { JSX } from "react";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type Path,
  type UseFormHandleSubmit,
} from "react-hook-form";

import { Button, ButtonGroup, Form, Stack } from "react-bootstrap";
import { filtersBootstrapLikeStyle } from "./FilterStyle";
import { SelectWithPagination } from "./SelectWithPagination";

import {
  FilterConfig,
  FilterItem,
  FiltersForm,
  InputFilterItem,
  YearRange,
  YearRangeFilterItem,
} from "../../../types";
import "./Filters.scss";
import styles from "./Filters.module.css";
import { YearRangeSelect } from "./YearRangeSelect";

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
            <Form.Group
              key={filter.name}
              className={styles.filters__item}
              style={{
                ["--filter-column" as any]: filter.column,
                ["--filter-min-width" as any]: filter.minWidth,
              }}
            >
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
                          filter_api_url_search_n_pagination={
                            filter.filter_api_url_search_n_pagination
                          }
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
                    case "year_range":
                      return (
                        <YearRangeSelect
                          minYear={
                            (filter as YearRangeFilterItem<typeof field.name>)
                              .min
                          }
                          maxYear={
                            (filter as YearRangeFilterItem<typeof field.name>)
                              .max
                          }
                          field={
                            field as ControllerRenderProps<
                              FiltersForm<T>,
                              Path<FiltersForm<T>>
                            > & {
                              value: YearRange | undefined;
                            }
                          }
                        />
                      );
                    default:
                      return <></>;
                  }
                }}
              />
            </Form.Group>
          ))}
        </Stack>

        <ButtonGroup className={styles.filters__buttons}>
          <Button variant="outline-secondary" onClick={onReset} type="button">
            Сбросить
          </Button>
          <Button type="submit">
            Применить
          </Button>
        </ButtonGroup>
      </Form>
    );
  }
) as <T extends FilterConfig>(props: Props<T>) => JSX.Element;
