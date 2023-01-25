import "./UpdateModal.css";

const UpdateModal = ({
  handleShowModal,
  modalData,
  setModalData,
  handleUpdateAgent,
}) => {
  const onTicketCountChange = (e) => {
    setModalData((prev) => ({ ...prev, ticket_count: e.target.value }));
  };

  return (
    <div className="modal">
      {/* x close window */}
      <button
        className="modal-x"
        onClick={() => handleShowModal((prev) => !prev)}
      >
        X
      </button>
      <div className="pu-content-container">
        <h1>Update Ticket Count</h1>

        <div className="pu-input-container">
          <span>
            <b>Agent Email:</b> {modalData.email}
          </span>
          <input
            type="number"
            name="updateTicket"
            id="updateTicket"
            placeholder="Update Ticket"
            value={modalData.ticket_count}
            onChange={(e) => onTicketCountChange(e)}
          />
        </div>
      </div>

      <div className="pu-button-container">
        <button className="update-modal" onClick={handleUpdateAgent}>
          Save
        </button>
        <button
          className="update-modal"
          onClick={() => handleShowModal((prev) => !prev)}
        >
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
