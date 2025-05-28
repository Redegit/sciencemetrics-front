import type { StylesConfig } from "react-select";

export const filtersBootstrapLikeStyle: StylesConfig = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? "#86b7fe" : "#ced4da",
    boxShadow: state.isFocused
      ? "0 0 0 0.2rem rgba(13, 110, 253, 0.25)"
      : "none",
    "&:hover": {
      borderColor: "#86b7fe",
    },
    fontSize: "1rem",
    borderRadius: "0.375rem",
    minHeight: "calc(1.5em + 0.75rem + 2px)",
    paddingLeft: "0.375rem",
    paddingRight: "0.375rem",
    ">div:first-of-type": {
      flexWrap: "nowrap",
    },
    transition: "all 150ms ease-in-out",
    cursor: "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0.375rem 0.75rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6c757d",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#212529",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#e9ecef",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#495057",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#6c757d",
    ":hover": {
      backgroundColor: "#ced4da",
      color: "#212529",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 10,
  }),
};
