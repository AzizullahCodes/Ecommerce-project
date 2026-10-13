
import React from "react";
import Cookies from "js-cookie";
import "./Profile.css";

const Profile = () => {
  const cookieVal = Cookies.get("myApp_login");

  let user = null;

  try {
    user = cookieVal ? JSON.parse(cookieVal) : null;
  } catch (error) {
    console.error("Invalid user cookie:", error);
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <h2>Profile Not Found</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-avatar">{initial}</div>

          <h1>My Profile</h1>
          <p>Manage your personal information</p>
        </div>

        <div className="profile-card">
          <div className="profile-card-title">
            <h2>Personal Information</h2>
            <span className="profile-status">Logged In</span>
          </div>

          <div className="profile-details">
            <div className="profile-field">
              <span className="profile-label">Full Name</span>
              <p>{user.name || "Not provided"}</p>
            </div>

            <div className="profile-field">
              <span className="profile-label">Email Address</span>
              <p>{user.email || "Not provided"}</p>
            </div>

            <div className="profile-field">
              <span className="profile-label">Account Role</span>
              <p className="profile-role">
                {user.role || "User"}
              </p>
            </div>
          </div>
        </div>

        <p className="profile-footer">
          Your account information
        </p>

      </div>
    </div>
  );
};

export default Profile;
