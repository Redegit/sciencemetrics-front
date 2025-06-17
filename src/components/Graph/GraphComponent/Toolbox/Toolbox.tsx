import React, { useState, useRef } from "react";
import { ToolboxButton } from "./ToolboxButton";
import { ToolboxToggle } from "./ToolboxToggle";
import { ToolboxIcons } from "./ToolboxIcons";
import styles from "./Toolbox.module.scss";
import { useOutsideClick } from "../../../../hook/useOutsideClick";

export type ToolboxButtonItem = {
  label: string;
  onClick: () => void;
  icon?: keyof typeof ToolboxIcons;
};

export type ToolboxToggleItem = {
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
  icon?: keyof typeof ToolboxIcons;
};

type Props = {
  buttons: ToolboxButtonItem[];
  toggles: ToolboxToggleItem[];
};

export const Toolbox = React.memo<Props>(({ buttons, toggles }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setOpen(false));

  return (
    <div className={styles.toolbox} ref={ref}>
      <button
        className={styles.toolbox__toggle}
        onClick={() => setOpen((v) => !v)}
      >
        <span>Опции</span>
        <svg
          className={styles.toolbox__arrow}
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
        </svg>
      </button>
      {open && (
        <div className={styles.toolbox__menu}>
          {buttons.map((btn, i) => (
            <ToolboxButton key={i} {...btn} />
          ))}
          {buttons.length > 0 && toggles.length > 0 && (
            <div className={styles.toolbox__divider} />
          )}
          {toggles.map((tgl, i) => (
            <ToolboxToggle key={i} {...tgl} />
          ))}
        </div>
      )}
    </div>
  );
});
