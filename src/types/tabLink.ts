import { Icon } from "src/layout/Tabs/Icon";

export type TabLink = {
  to: string;
  label: string;
  icon: (typeof Icon)[keyof typeof Icon];
};
