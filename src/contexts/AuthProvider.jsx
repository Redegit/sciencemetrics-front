import { useState } from "react";
import { AuthContext } from "./authContext";
import { request } from "../api/request";

const loadUserFromStorage = () => {
  const user = localStorage.getItem("user");
  try {
    return user && JSON.parse(user);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserFromStorage());

  const signUserIn = async (username, password) => {
    try {
      const data = await request.post("/login", { username, password });
      console.log(data);
      const user = {
        username: data.name,
        signature: data.signature,
        avatar: data.avatar,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.log(err);
      const user = {
        username: "Алхажа Омран",
        signature: "ЦРПО",
        avatar: "/assets/avatar-boy.png",
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  };

  const signUserOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    signUserIn,
    signUserOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
