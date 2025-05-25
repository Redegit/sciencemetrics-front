import { FluidBackground } from "../components/FluidBackground/FluidBackground";
import { Header } from "../layout/Header/Header";
import { Navigation } from "../layout/Navigation/Navigation";
import { Outlet } from "react-router-dom";

export const BasePageWrapper = () => {
  return (
    <>
      <FluidBackground />
      <Header />
      <main className="main">
        <aside>
          <Navigation />
        </aside>
        <Outlet />
      </main>
    </>
  );
};
