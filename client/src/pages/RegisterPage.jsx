import { useState } from "react";

import IMAGES from "../assets";
import Notify from "../utils/notify";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    address: "",
    profilePic: "",
  });
  const [imagePreview, setImagePreview] = useState(IMAGES.avatar);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Right way to change state
  };

  const handleProfilePic = async (e) => {
    setIsLoading(true);
    const profilePic = e.target.files[0]; // Get the file

    // Check file type
    if (
      profilePic.type !== "image/jpeg" &&
      profilePic.type !== "image/jpg" &&
      profilePic.type !== "image/png"
    ) {
      e.target.value = null; // Clear upload field
      setImagePreview(IMAGES.avatar);
      setIsLoading(false);
      return Notify("Only .jpeg, .jpg and .png supported", "warn");
    }

    // Check file size
    if (profilePic.size > 1 * 1024 * 1024) {
      e.target.value = null; // Clear upload field
      setImagePreview(IMAGES.avatar);
      setIsLoading(false);
      return Notify("Please upload image under 1 MB", "warn");
    }

    // Save the image in FormData object
    const formData = new FormData();
    formData.append("file", profilePic); // Contains the file
    formData.append(
      "upload_preset",
      `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
    ); // Upload preset in Cloudinary
    formData.append(
      "cloud_name",
      `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
    ); // Cloud name in Cloudinary

    try {
      // Upload image to cloudinary if user selected an image
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudinaryData = await cloudinaryResponse.json();

      // If profile pic is uploaded, set the image URL for registration
      setUser((prev) => ({
        ...prev,
        profilePic: cloudinaryData.secure_url.toString(),
      }));

      // Image preview logic
      const reader = new FileReader();
      reader.readAsDataURL(profilePic);
      reader.onload = () => setImagePreview(reader.result);

      setIsLoading(false);
      return Notify("Profile pictute uploaded", "success");
    } catch (error) {
      e.target.value = null; // Clear upload field
      setImagePreview(IMAGES.avatar);
      setIsLoading(false);
      return Notify("Internal server error", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (
      !user.name ||
      !user.email ||
      !user.mobile ||
      !user.password ||
      !user.confirmPassword ||
      !user.birthday ||
      !user.address
    ) {
      setIsLoading(false);
      console.log(user);
      return Notify("Please Fill all the Feilds", "warn");
    }

    // If password and confirm password doesn't match
    if (user.password !== user.confirmPassword) {
      setIsLoading(false);
      return Notify("Passwords Do Not Match", "warn");
    }

    // If password is less than 8 characters
    if (user.password.length < 8) {
      setIsLoading(false);
      return Notify("Password must be at least 8 characters", "warn");
    }

    try {
      // Register user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          password: user.password,
          birthday: user.birthday,
          address: user.address,
          profilePic: user.profilePic,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setIsLoading(false);
        return Notify(data.message, "success");
      } else {
        setIsLoading(false);
        return Notify(data.error, "error");
      }
    } catch (error) {
      setIsLoading(false);
      return Notify("Internal server error", "error");
    }
  };

  return (
    <div className="register-form">
      <h2>Create New Account for Agent</h2>
      <div className="image-container">
        <img src={imagePreview} alt="Profile image" draggable="false" />
      </div>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="number"
        name="mobile"
        id="mobile"
        placeholder="Mobile Number"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <input
        type="date"
        name="birthday"
        id="birthday"
        onChange={handleChange}
      />
      <textarea
        name="address"
        id="address"
        placeholder="Address"
        onChange={handleChange}
      />
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        name="profilePic"
        onChange={handleProfilePic}
      />

      <button
        className="register-form-btn"
        disabled={isLoading ? true : false}
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
