import { useState } from "react";

// Context
import { AuthState } from "../context/AuthProvider";

// Assets
import IMAGES from "../assets";

const BookTicketPage = () => {
  const [ticketDetails, setTicketDetails] = useState({
    totalNumberOfTickets: null,
    maleOldAgedPassengerCount: null,
    femaleOldAgedPassengerCount: null,
    malePassengerCount: null,
    femalePassengerCount: null,
  });

  const { auth } = AuthState();

  const handleChange = (e) => {
    setTicketDetails((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Right way to change state
  };

  const handleSubmit = (e) => {};
  return (
    <div className="book-ticket-form">
      <div className="ticket-contaner">
        <span>You can book {auth.ticketCount} tickets</span>
        <img src={IMAGES.ticket} alt="Ticket" />
      </div>

      <h2>Book Tickets</h2>

      <input
        type="number"
        name="totalNumberOfTickets"
        id="totalNumberOfTickets"
        placeholder="Total number of tickets"
        onChange={handleChange}
      />
      <input
        type="number"
        name="maleOldAgedPassengerCount"
        id="maleOldAgedPassengerCount"
        placeholder="Male Passengers above 60 years of age"
        onChange={handleChange}
      />
      <input
        type="number"
        name="femaleOldAgedPassengerCount"
        id="femaleOldAgedPassengerCount"
        placeholder="Female Passengers above 60 years of age"
        onChange={handleChange}
      />

      <input
        type="number"
        name="malePassengerCount"
        id="malePassengerCount"
        placeholder="Male Passengers below 60 years of age"
        onChange={handleChange}
      />
      <input
        type="number"
        name="femalePassengerCount"
        id="femalePassengerCount"
        placeholder="Female Passengers below 60 years of age"
        onChange={handleChange}
      />

      <button className="book-ticket-btn" onClick={handleSubmit}>
        Book Ticket
      </button>
    </div>
  );
};

export default BookTicketPage;
