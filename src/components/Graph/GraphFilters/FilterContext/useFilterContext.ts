import React from "react";
import { FilterContext } from "./filterContext";

export const useFilterContext = () => {
  const context = React.useContext(FilterContext);
  return context;
};
