import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationTabs } from "../layout/Tabs/Tabs";
import "../css/Dashboard.scss";

const DashboardPageWrapper = React.memo(() => {
  return (
    <div className="custom-container">
      <NavigationTabs />
      <Outlet />
    </div>
  );
});

const DashboardFilters = React.memo<{ children: React.ReactNode }>(
  ({ children }) => {
    return <div className="filters-container dashboard-card">{children}</div>;
  }
);

const DashboardLayoutContainer = React.memo<{
  children: React.ReactNode;
  title?: string;
}>(({ children, title }) => {
  return (
    <div className="dashboard-layout-container dashboard-card">
      {title && <h4 className="dashboard-title">{title}</h4>}
      {children}
    </div>
  );
});

type DashboardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

const DashboardBody = React.memo<DashboardBodyProps>(
  ({ children, className }) => {
    return (
      <div className={`dashboard-body ${className || ""}`}>{children}</div>
    );
  }
);

export const Dashboard = {
  Page: DashboardPageWrapper,
  Filters: DashboardFilters,
  Layout: DashboardLayoutContainer,
  Body: DashboardBody,
};
