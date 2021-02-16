import { useContext, createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const AppContext = createContext(null);
const AuthContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("access_token") ? true : false
  );

  useEffect(() => {
    if (!Cookies.get("access_token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      Cookies.remove("access_token");
    }
  }, [isLoggedIn]);
  return (
    <AppContext.Provider value={{}}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};
