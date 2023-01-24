import { useState, useEffect } from "react";

// Context
import { AuthState } from "../context/AuthProvider";

// Components
import { UserManagementTable } from "../components";

// Utils
import Notify from "../utils/notify";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const { auth } = AuthState();

  const handleDeleteAgent = async (email) => {
    try {
      const response = await fetch("/api/agent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        fetchAgentData(); // Fetch updated list of agents
        return Notify(data.message, "success");
      } else {
        return Notify(data.error, "error");
      }
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  const fetchAgentData = async () => {
    try {
      let response = await fetch("/api/agent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      response = await response.json();

      if (response.success) {
        return setData((prev) => [...response.data]);
      }
    } catch (error) {
      return Notify("Unable to fetch data. Please try again later.", "error");
    }
  };

  useEffect(() => {
    fetchAgentData();
  }, []);

  return (
    <UserManagementTable data={data} handleDeleteAgent={handleDeleteAgent} />
  );
};

export default Dashboard;
