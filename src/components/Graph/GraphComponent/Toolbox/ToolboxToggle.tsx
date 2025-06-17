import React from "react";
import { ToolboxIcons } from "./ToolboxIcons";
import styles from "./Toolbox.module.scss";

export type Props = {
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
  icon?: keyof typeof ToolboxIcons;
};

export const ToolboxToggle = React.memo<Props>(
  ({ label, value, onToggle, icon }) => {
    const Icon = icon ? ToolboxIcons[icon] : null;
    return (
      <label className={styles.toolbox__item}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onToggle(e.target.checked)}
        />
        {Icon && <Icon className={styles.toolbox__icon} />}
        <span>{label}</span>
      </label>
    );
  }
);
