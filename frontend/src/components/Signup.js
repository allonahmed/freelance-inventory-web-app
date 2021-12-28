import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Signup = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setError] = useState("");

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      SubmitSignUp();
    }
  };

  const SubmitSignUp = (e) => {
    e.preventDefault();
    if (isValid()) {
      axios
        .post("http://localhost:5000/signup/", {
          // send info to server
          firstName: fullName.split(" ")[0], // split used to seperate first and last name from full name
          lastName: fullName.split(" ")[1],
          password: verifyPassword,
          email: newEmail,
        })
        .then((res) => {
          console.log(res.data.password); //test to see if password gets encrypted (delete when going to prod)
        });
    }
  };

  const isValid = () => {
    if (
      newEmail.length === 0 ||
      newPassword.length === 0 ||
      fullName.length === 0 ||
      verifyPassword.length === 0
    ) {
      setError("You must complete all fields to login!");
      return false;
    } else if (newPassword.length < 8) {
      setError("Your password must be at least 8 characters!");
      return false;
      // eslint-disable-next-line
    } else if (!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(newPassword)) {
      setError("Your password must have at least one special character");
      return false;
    } else if (newPassword !== verifyPassword) {
      setError("Your did not re-enter the same password!");
      return false;
    } else {
      setError("Success");
      return true;
    }
  };

  return (
    <form className="signup-form">
      <div className="input-container">
        <label>Full Name: </label>
        <i className="fa fa-user icon"></i>
        <input
          className="sign-in-input"
          type="text"
          onKeyPress={handleKeypress}
          placeholder="Enter your full name"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <label>Email: </label>
        <i className="fa fa-lock icon"></i>
        <input
          className="sign-in-input"
          type="email"
          onKeyPress={handleKeypress}
          placeholder="Enter your email address"
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <label>Password: </label>
        <i className="fa fa-lock icon"></i>
        <input
          className="sign-in-input"
          type="password"
          onKeyPress={handleKeypress}
          placeholder="Enter a password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        {errorMessage}
      </div>
      <div className="input-container">
        <label>Verify Password: </label>
        <i className="fa fa-lock icon"></i>
        <input
          className="sign-in-input"
          type="password"
          onKeyPress={handleKeypress}
          placeholder="Re-enter your password"
          onChange={(e) => {
            setVerifyPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={SubmitSignUp}> sign up</button>
      {/* <button onClick={HandleFlip}>sign in</button> */}
    </form>
  );
};

export default Signup;
