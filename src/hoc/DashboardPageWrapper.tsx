import { Outlet } from "react-router-dom";
import { NavigationTabs } from "../layout/Tabs";
import React from "react";

export const DashboardPageWrapper = React.memo(() => {
  return (
    <div className="custom-container">
      <div className="row">
        <div className="col-sm-12 pb-4 header">
          <div className="lineNavigContent"></div>
          <NavigationTabs />
        </div>
      </div>
      <div className="col-sm-12 mt-2 mb-2 g-2 container-chaild-cyrpd">
        <div className="row d-flex justify-content-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
});
