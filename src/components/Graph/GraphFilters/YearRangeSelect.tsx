import React, { JSX } from "react";
import { type ControllerRenderProps, type Path } from "react-hook-form";
import Select, { type SingleValue } from "react-select";
import { FilterConfig, FiltersForm, YearRange } from "../../../types";
import { filtersBootstrapLikeStyle } from "./FilterStyle";

type PropsYearRange<T extends FilterConfig> = {
  field: ControllerRenderProps<FiltersForm<T>, Path<FiltersForm<T>>> & {
    value: YearRange | undefined;
  };
  minYear: number;
  maxYear: number;
};

type YearSelectOption = {
  value: number;
  label: string;
};

export const YearRangeSelect = React.memo(
  <T extends FilterConfig>({ minYear, maxYear, field }: PropsYearRange<T>) => {
    const options = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => maxYear - i
    ).map((year) => ({
      value: year,
      label: String(year),
    }));

    const handleFromChange = (selected: SingleValue<YearSelectOption>) => {
      const from = selected?.value ?? minYear;
      let to = field.value?.to ?? maxYear;
      if (from > to) to = from;
      field.onChange({ from, to });
    };

    const handleToChange = (selected: SingleValue<YearSelectOption>) => {
      const to = selected?.value ?? maxYear;
      let from = field.value?.from ?? minYear;
      if (from > to) from = to;
      field.onChange({ from, to });
    };

    return (
      <div className="year_select__container">
        <Select
          classNamePrefix="year_select"
          options={options}
          value={options.find((o) => o.value === field.value?.from)}
          onChange={(newValue) =>
            handleFromChange(newValue as SingleValue<YearSelectOption>)
          }
          placeholder="От"
          styles={filtersBootstrapLikeStyle}
        />
        <div className="year_select__separator" />
        <Select
          classNamePrefix="year_select"
          options={options}
          value={options.find((o) => o.value === field.value?.to)}
          onChange={(newValue) =>
            handleToChange(newValue as SingleValue<YearSelectOption>)
          }
          placeholder="До"
          styles={filtersBootstrapLikeStyle}
        />
      </div>
    );
  }
) as <T extends FilterConfig>(props: PropsYearRange<T>) => JSX.Element;
