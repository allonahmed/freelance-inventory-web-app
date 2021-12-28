import React, { useState } from "react";
import axios from "axios";
import ReactCardFlip from "react-card-flip";
import { useDispatch } from "react-redux";
import login from "../features/user";

import "../App.css";

axios.defaults.withCredentials = true;
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isFlipped, setFlipped] = useState(false);
  const [errorMessage, setError] = useState("");
  const dispatch = useDispatch();

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

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      SumbitLogin();
    }
  };

  const SumbitLogin = (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setError("Please complete all fields");
    } else {
      axios
        .post("http://localhost:5000/signin", {
          //send input values to server to check for valid credentials
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data.message) {
            // if we have a message, this means credentials are invalid
            setError(res.data.message); // set message to error so user knows to relogin
            console.log(errorMessage);
          } else {
            // otherwise, info is valid
            console.log(errorMessage);
            axios.get("http://localhost:5000/login").then((response) => {
              dispatch(
                login({
                  name: "response.data.user[0].first_name",
                  email: "response.data.user[0].email",
                  loggedIn: true,
                })
              );
              // dispatch(
              //   login({ name: "Allon", email: "Allonahmed@mec.science" })
              // );
              console.log(response);
            });
          }
        });
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

  const HandleFlip = (e) => {
    // changes flipped to opposite when button is clicked
    e.preventDefault();
    setFlipped(!isFlipped);
  };

  return (
    <div className="sign-in-container">
      <ReactCardFlip
        containerStyle={{ width: "67%" }}
        isFlipped={isFlipped}
        flipDirection="horizontal"
      >
        <form className="signin-form">
          <h4>{errorMessage.length > 0 ? errorMessage : null}</h4>
          <div className="input-container">
            <label>Email: </label>
            <i className="fa fa-envelope icon"></i>
            <input
              className="sign-in-input"
              type="email"
              placeholder="Enter your email"
              onKeyPress={handleKeypress}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label>Password: </label>
            <i className="fa fa-lock icon"></i>
            <input
              className="sign-in-input"
              type="password"
              placeholder="Enter your password"
              onKeyPress={handleKeypress}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button onClick={SumbitLogin}> Log In</button>
          <p>
            Do not have an account?{" "}
            <button onClick={HandleFlip}>Register</button>
          </p>
        </form>
        <form className="signup-form">
          <div className="input-container">
            <label>Full Name: </label>
            <i className="fa fa-user icon"></i>
            <input
              className="sign-in-input"
              type="text"
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
              placeholder="Re-enter your password"
              onChange={(e) => {
                setVerifyPassword(e.target.value);
              }}
            />
          </div>
          <button onClick={SubmitSignUp}> sign up</button>
          <button onClick={HandleFlip}>sign in</button>
        </form>
      </ReactCardFlip>
    </div>
  );
};

export default Signin;
