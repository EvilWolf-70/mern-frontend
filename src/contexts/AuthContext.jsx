import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error()`useAuth must be used within authprovider`;
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // register
  const register = async (userData) => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", userData);

      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data) {
        setUser(data);
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  //login

  const login = async (loginData) => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", loginData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Invalid email or password",
      };
    } finally {
      setLoading(false);
    }
  };

  //logout

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    register,
    login,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
