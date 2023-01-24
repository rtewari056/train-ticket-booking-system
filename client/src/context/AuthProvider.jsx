import { useContext, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    !localStorage.getItem("auth")
      ? null
      : JSON.parse(localStorage.getItem("auth"))
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
