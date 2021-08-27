import React from "react";

import "./FormProfileUpdate.scss";

const FormProfileUpdate = ({
  confirmPassword,
  email,
  handleChangeConfirmPassword,
  handleChangeEmail,
  handleChangePassword,
  handleChangeUsername,
  handleUpdateProfile,
  password,
  username,
}) => {
  return (
    <form
      className="profile-wrapper__profile profile"
      onSubmit={handleUpdateProfile}
    >
      <div className="profile__wrapper-details">
        <input
          className="profile__input"
          id="name"
          placeholder="Username"
          type="text"
          value={username}
          onChange={handleChangeUsername}
          required
        />
        <label htmlFor="name" className="profile__label">
          Username:
        </label>
      </div>
      <div className="profile__wrapper-details">
        <input
          className="profile__input"
          id="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <label htmlFor="email" className="profile__label">
          Email:
        </label>
      </div>
      <div className="profile__wrapper-details">
        <input
          className="profile__input"
          id="password"
          placeholder="Password"
          type="text"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <label htmlFor="password" className="profile__label">
          Password:
        </label>
      </div>
      <div className="profile__wrapper-details">
        <input
          className="profile__input"
          id="confirmPassword"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          required
        />
        <label htmlFor="confirmPassword" className="profile__label">
          Confirm Password:
        </label>
      </div>
      <button className="profile__button">Update profile</button>
    </form>
  );
};

export default FormProfileUpdate;
