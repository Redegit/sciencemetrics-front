import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.admin);

  const signAdminIn = async (newAdmin) => {
    localStorage.admin = newAdmin;
    setAdmin(newAdmin);
  };
  
  const signAdminOut = async () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  const value = {
    admin,
    signAdminIn,
    signAdminOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
