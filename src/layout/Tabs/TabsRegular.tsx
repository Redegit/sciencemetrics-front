import React from "react";
import { TabLinkItem } from "./TabLinkItem";
import { tabLinks } from "./TabsData";

export const TabsRegular = React.memo(() => {
  return (
    <div className="tabs-container">
      <div className="blockNavigContent">
        {tabLinks.map((link, index) => (
          <TabLinkItem key={index} link={link} />
        ))}
      </div>
    </div>
  );
});
