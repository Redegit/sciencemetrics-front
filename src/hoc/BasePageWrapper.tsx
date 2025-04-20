import { Header } from "../layout/Header";
import { Navigation } from "../layout/Navigation";
import { Outlet } from "react-router-dom";

export const BasePageWrapper = () => {
  return (
    <div>
      <Header user={{ isAuthenticated: true }} />

      <main className="main">
        <Navigation />
        <Outlet />
      </main>
    </div>
  );
};
