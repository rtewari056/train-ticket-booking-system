import { Outlet, Navigate } from "react-router-dom";

// import checkUserSignedIn from "./checkUserSignedIn";
import { AuthState } from "../context/AuthProvider";

const SuperAdminRoutes = () => {
  const { auth } = AuthState();

  // If "auth" !== null access private routes else navigate to login
  return auth !== null && (auth.isSuperAdmin && new Date() < new Date(auth.expires_at)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default SuperAdminRoutes;
