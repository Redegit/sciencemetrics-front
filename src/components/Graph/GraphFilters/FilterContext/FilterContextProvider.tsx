import React, { useState } from "react";
import { FilterContext } from "./filterContext";
type Props = {
  children: React.ReactNode;
};

export const FilterContextProvider = React.memo<Props>(({ children }) => {
  const [isFilterFocused, setIsFilterFocused] = useState<boolean>(false);

  const onBlur = () => {
    setIsFilterFocused(() => false);
  };

  const onFocus = () => {
    setIsFilterFocused(() => true);
  };

  return (
    <FilterContext.Provider
      value={{ focused: isFilterFocused, onBlur, onFocus }}
    >
      {children}
    </FilterContext.Provider>
  );
});
