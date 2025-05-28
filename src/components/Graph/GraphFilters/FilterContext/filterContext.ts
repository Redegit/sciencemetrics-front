import { createContext } from "react";

type FilterContextProps = {
  focused: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
};

export const FilterContext = createContext<FilterContextProps>({
  focused: false,
});
