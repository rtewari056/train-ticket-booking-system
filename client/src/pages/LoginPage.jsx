import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthState } from "../context/AuthProvider";
import Notify from "../utils/notify";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = AuthState();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Right way to change state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (!user.email || !user.password) {
      setIsLoading(false);
      return Notify("Please Fill all the Feilds", "warn");
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth", JSON.stringify(data)); // Save auth details in local storage
        setAuth(data);
        setIsLoading(false);
        if(data.isSuperAdmin) {
          navigate("/dashboard"); // Go to dashboard page
        } else {
          navigate("/book_ticket"); // Go to book ticket page
        }
        return Notify("You are successfully logged in", "success");
      } else {
        setIsLoading(false);
        return Notify(data.error, "warn");
      }
    } catch (error) {
      setIsLoading(false);
      return Notify("Internal server error", "error");
    }
  };

  return (
    <div className="login-form">
      <h2>Login to Your Account</h2>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button className="login-form-btn" disabled={isLoading ? true : false} onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
