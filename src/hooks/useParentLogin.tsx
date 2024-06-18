import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../helper/axios";
import { useNavigate, useLocation } from "react-router-dom";

export const useParentLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const parentLogin = async (primary_email: any, p_password: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post(`api/parent_login`, {
        primary_email,
        p_password,
      });
      const userData = await response.data;
      if (userData.status_code === 500) {
        throw new Error(`${userData.detail}`);
      }
      dispatch({ type: "LOGIN", payload: userData });
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      const { from }: any = location.state || { from: { pathname: "/" } };
      navigate(from);
    } catch (error) {
      console.error("Error in useLogin", error);
      setError(error);
      setIsLoading(false);
    }
  };

  return { parentLogin, isLoading, error };
};
