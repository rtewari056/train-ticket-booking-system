import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css"; // CSS for "react-toastify"

import {
  Dashboard,
  BookTicketPage,
  LoginPage,
  RegisterPage,
  SuperAdminRegisterPage,
  ProfilePage,
} from "./pages";
import { NavBar, PrivateRoutes, SuperAdminRoutes } from "./components";

import "./style.css";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route element={<SuperAdminRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/book_ticket" element={<BookTicketPage />} />
          </Route>

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/super_admin_register"
            element={<SuperAdminRegisterPage />}
          />

          {/* If the user enters an invalid path in the URL it automatically redirects them to the homepage */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
