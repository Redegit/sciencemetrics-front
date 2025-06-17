import React from "react";
import { ToolboxIcons } from "./ToolboxIcons";
import styles from "./Toolbox.module.scss";

export type Props = {
  label: string;
  onClick: () => void;
  icon?: keyof typeof ToolboxIcons;
};

export const ToolboxButton = React.memo<Props>(({ label, onClick, icon }) => {
  const Icon = icon ? ToolboxIcons[icon] : null;
  return (
    <button className={styles.toolbox__item} onClick={onClick}>
      {Icon && <Icon className={styles.toolbox__icon} />}
      <span>{label}</span>
    </button>
  );
});
