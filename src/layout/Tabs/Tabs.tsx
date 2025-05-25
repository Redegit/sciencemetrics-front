import "./Tabs.scss";
import { TabsRegular } from "./TabsRegular";
import { TabsCollapsible } from "./TabsCollapsible";

export const NavigationTabs = () => {
  return (
    <>
      <div className="mobile-only">
        <TabsCollapsible />
      </div>
      <div className="desktop-only">
        <TabsRegular />
      </div>
    </>
  );
};
