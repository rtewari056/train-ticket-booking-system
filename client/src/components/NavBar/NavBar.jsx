import { useNavigate } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";

import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = AuthState();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    return navigate("/login");
  };

  return (
    <nav>
      <h2>Ticket Booking System</h2>
      <ul>
        {auth !== null  ? (
          <>
            {auth.isSuperAdmin ? (
              <>
                <li>
                  <button onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/register")}>
                    Register agent
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/profile")}>Profile</button>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => navigate("/book_ticket")}>Book Ticket</button>
                </li>
                <li>
                  <button onClick={() => navigate("/profile")}>Profile</button>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </>
        ) : (
          <>
          <li>
            <button onClick={() => navigate("/login")}>Login</button>
          </li>
          <li>
            <button onClick={() => navigate("/super_admin_register")}>Register as super admin</button>
          </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
