import React, { createContext, useEffect, useState } from "react";
import { getIsAuth, signInUser } from "../api/auth";
import { useNotificaion } from "../hooks";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isPending: false,
  isLoggedIn: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const { updateNotification } = useNotificaion();
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });

    const { error, user } = await signInUser({ email, password });

    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    navigate("/", { replace: true });
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
    localStorage.setItem("auth-token", user.loginToken);
  };

  const isAuth = async () => {
    setAuthInfo({ ...authInfo, isPending: true });
    const token = localStorage.getItem("auth-token");
    if (!token) return setAuthInfo({ ...authInfo, isPending: false });
    const { error, user } = await getIsAuth(token);

    if (error) return setAuthInfo({ ...authInfo, isPending: false, error });
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
    navigate("/", { replace: true });
  };
  useEffect(() => {
    isAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, isAuth, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
