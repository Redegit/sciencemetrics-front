import { Outlet } from "react-router-dom";
import { NavigationTabs } from "../layout/Tabs/Tabs";
import React from "react";

export const DashboardPageWrapper = React.memo(() => {
  return (
    <div className="custom-container">
      <NavigationTabs />
      <Outlet />
    </div>
  );
});
