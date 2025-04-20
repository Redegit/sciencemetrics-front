import { NavigationTabs } from "../layout/Tabs";
import React from "react";

type Props = {
  filtersComponent?: React.ReactNode;
  dashboardComponent?: React.ReactNode;
};
export const DashboardPageWrapper = React.memo<Props>(
  ({ filtersComponent, dashboardComponent }) => {
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
            {filtersComponent}
            <div className="col-sm-12 mt-3 mb-3 g-3 blockrpdVerified">
              {dashboardComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
