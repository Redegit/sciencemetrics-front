import React, { JSX, useState } from "react";
import type { ControllerRenderProps, Path } from "react-hook-form";
import type { MultiValue, SingleValue } from "react-select";
import Select from "react-select";
import { SelectOption, FilterConfig, FiltersForm } from "../../../types";
import { getFiltersData } from "../../../api/getFilterData";
import { AsyncPaginate } from "react-select-async-paginate";

type Props<T extends FilterConfig> = Omit<
  React.ComponentProps<typeof Select>,
  "name"
> & {
  field: ControllerRenderProps<FiltersForm<T>, Path<FiltersForm<T>>>;
  name: string;
};

export const SelectWithPagination = React.memo(
  <T extends FilterConfig>({ field, ...props }: Props<T>) => {
    const [error, setError] = useState<boolean>(false);
    const loadOptions = async (
      search: string,
      _: unknown, // loadedOptions
      additional: { page?: number } = {}
    ) => {
      const page = additional.page || 1;
      try {
        const data = await getFiltersData(props.name, search, page);
        setError(true);
        return {
          options: data.items,
          hasMore: data.hasMore,
          additional: {
            page: page + 1,
          },
        };
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setError(true);
        return {
          options: [],
          hasMore: false,
          additional: {
            page: 1,
          },
        };
      }
    };

    const handleSelectChange = (
      selected: SingleValue<SelectOption> | MultiValue<SelectOption>,
      field: ControllerRenderProps<FiltersForm<T>, Path<FiltersForm<T>>>
    ) => {
      let selectedValues: string[] = [];

      if (Array.isArray(selected)) {
        selectedValues = selected.map((item) => item.value);
      } else {
        selectedValues = selected ? [(selected as SelectOption).value] : [];
      }
      field.onChange(selectedValues);
      console.log(selectedValues);
    };

    return (
      <AsyncPaginate
        {...props}
        isClearable
        loadOptions={loadOptions}
        loadingMessage={() => "Загрузка..."}
        noOptionsMessage={() =>
          error ? "Ошибка получения данных" : "Нет доступных вариантов"
        }
        onChange={(newValue: unknown) =>
          handleSelectChange(
            newValue as SingleValue<SelectOption> | MultiValue<SelectOption>,
            field
          )
        }
      />
    );
  }
) as unknown as <T extends FilterConfig>(props: Props<T>) => JSX.Element;
