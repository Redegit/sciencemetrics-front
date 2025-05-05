import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export const RequireAuth = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
};
