import { useState, useEffect } from "react";

// Context
import { AuthState } from "../context/AuthProvider";

// Components
import { UserManagementTable, UpdateModal } from "../components";

// Utils
import Notify from "../utils/notify";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Controls if modal displays
  const [modalData, setModalData] = useState({
    email: "",
    ticket_count: null,
  });

  const { auth } = AuthState();

  const handleUpdateAgent = async () => {
    try {
      const response = await fetch("/api/agent", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(modalData),
      });
      const data = await response.json();

      if (data.success) {
        fetchAgentData(); // Fetch updated list of agents
        handleShowModal((prev) => !prev);
        return Notify(data.message, "success");
      } else {
        return Notify(data.error, "error");
      }
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  const handleShowModal = (email, ticketCount) => {
    setShowUpdateModal((prev) => !prev);
    setModalData((prev) => ({
      ...prev,
      email: email,
      ticket_count: ticketCount,
    }));
  };

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
    <>
      <UserManagementTable
        data={data}
        handleDeleteAgent={handleDeleteAgent}
        handleShowModal={handleShowModal}
        setShowUpdateModal={setShowUpdateModal}
      />
      {showUpdateModal && (
        <UpdateModal
          handleShowModal={handleShowModal}
          modalData={modalData}
          setModalData={setModalData}
          handleUpdateAgent={handleUpdateAgent}
        />
      )}
    </>
  );
};

export default Dashboard;
