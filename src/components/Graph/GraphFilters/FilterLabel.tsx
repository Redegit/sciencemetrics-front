import React, { ComponentProps } from "react";
import { Form } from "react-bootstrap";
import { useFilterContext } from "./FilterContext/useFilterContext";
import styles from "./Filters.module.css";

type Props = {
  label: string;
} & ComponentProps<typeof Form.Label>;

export const FilterLabel = React.memo<Props>(({ className, label }) => {
  const { focused } = useFilterContext();

  return (
    <Form.Label data-focused={focused} className={className || "" + (focused && styles.focused)}>
      {label}
    </Form.Label>
  );
});
