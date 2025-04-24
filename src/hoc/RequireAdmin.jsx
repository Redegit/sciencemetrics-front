import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export const RequireAdmin = () => {
  const location = useLocation();
  const { admin } = useAuth();

  if (!admin) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
};
