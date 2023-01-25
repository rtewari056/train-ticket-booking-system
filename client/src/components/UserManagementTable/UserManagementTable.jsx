import React from "react";

import "./UserManagementTable.css";

const UserManagementTable = ({ data, handleDeleteAgent, handleShowModal }) => {
  return (
    <div className="usermanagementtable-container">
      <h1 className="table-heading">Manage Agents</h1>

      <table className="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>Verified</th>
            <th>Ticket Count</th>
            <th>Update Agent</th>
            <th>Delete Agent</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((agent, index) => (
            <tr key={index}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.mobile}</td>
              <td>
                {new Date(agent.birthday)
                  .toISOString()
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-")}
              </td>
              <td>{agent.address}</td>
              <td>{agent.is_verified ? "Yes" : "No"}</td>
              <td>{agent.ticket_count}</td>
              <td>
                <button
                  role="button"
                  className="update-button"
                  onClick={() => handleShowModal(agent.email, agent.ticket_count)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  role="button"
                  className="delete-button"
                  onClick={() => handleDeleteAgent(agent.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;
