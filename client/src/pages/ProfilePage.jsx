import { AuthState } from "../context/AuthProvider";

const ProfilePage = () => {
  const { auth } = AuthState();

  return (
    <div className="profile-form">
      <h2>My Profile</h2>
      <div className="image-container">
        <img src={auth.profilePic} alt="Profile image" draggable="false" />
      </div>
      <span style={{ textAlign: "left" }}>Name:</span>
      <input
        type="text"
        name="profile-name"
        id="profile-name"
        value={auth.name}
        placeholder="Name"
        disabled
      />

      <span style={{ textAlign: "left" }}>Email:</span>
      <input
        type="email"
        name="profile-email"
        id="profile-email"
        value={auth.email}
        placeholder="Email"
        disabled
      />

      <span style={{ textAlign: "left" }}>Mobile Number:</span>
      <input
        type="number"
        name="profile-mobile"
        id="profile-mobile"
        value={auth.mobile}
        placeholder="Mobile Number"
        disabled
      />

      <span style={{ textAlign: "left" }}>Birth Day:</span>
      <input
        type="text"
        name="profile-birthday"
        id="profile-birthday"
        value={new Date(auth.birthday)
          .toISOString()
          .replace(/T.*/, "")
          .split("-")
          .reverse()
          .join("-")}
        disabled
      />

      <span style={{ textAlign: "left" }}>Address:</span>
      <textarea
        name="profile-address"
        id="profile-address"
        value={auth.address}
        placeholder="Address"
        disabled
      />

      <button
        className="profile-form-btn"
        onClick={() => history.back()}
      >
        Go back
      </button>
    </div>
  );
};

export default ProfilePage;
