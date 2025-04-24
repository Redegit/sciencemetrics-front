export type FilterType =
  | "select"
  | "multi-select"
  | "checkbox" // not implemented yet
  | "radio" // not implemented yet
  | "input"
  | "slider"; // not implemented yet

// filter items. Сами фильтры
export type SelectOption = {
  label: string;
  value: string;
};

export type BaseFilterItem<T extends string> = {
  name: T;
  label: string;
};

export type SelectFilterItem<T extends string> = BaseFilterItem<T> & {
  filter_type: "select";
  filter_api_url_search_n_pagination: string;
  options?: SelectOption[];
};

export type MultiSelectFilterItem<T extends string> = BaseFilterItem<T> & {
  filter_type: "multi-select";
  filter_api_url_search_n_pagination: string;
  options?: SelectOption[];
};

export type InputFilterItem<T extends string> = BaseFilterItem<T> & {
  filter_type: "input";
} & Pick<
    React.ComponentProps<"input">,
    | "placeholder"
    | "defaultValue"
    | "maxLength"
    | "minLength"
    | "type"
    | "step"
    | "min"
    | "max"
    | "pattern"
    | "required"
  >;

export type TypedFilterItem<
  T extends string,
  K extends FilterType
> = K extends "select"
  ? SelectFilterItem<T>
  : K extends "multi-select"
  ? MultiSelectFilterItem<T>
  : K extends "input"
  ? InputFilterItem<T>
  : never;

export type FilterItem<T extends FilterConfig> = {
  [K in keyof T]: TypedFilterItem<K & string, T[K]>;
}[keyof T];

// filter form. Значение фильтров для отправки на сервер
export type FilterConfig = Record<string, FilterType>;

export type FiltersForm<T extends FilterConfig> = {
  [K in keyof T]: T[K] extends "multi-select" | "select"
    ? SelectOption["value"][]
    : T[K] extends "input"
    ? string | number | boolean
    : never;
};

// API
export type FilterSelect<T> = {
  name: keyof T;
  label: string;
  isMultiSelect?: boolean;
};

export type SelectFiltersApi = {
  items: FilterSelect<unknown>[];
  total: number;
  hasMore: boolean;
};
