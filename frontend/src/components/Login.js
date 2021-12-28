import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; //for modifying state
import { login } from "../features/user"; // importing our login action fucntion
import axios from "axios";
import { Redirect } from "react-router";
import homeImage from "../media/photos/ihq.png";
import { Image } from "../components/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

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
        .then((response) => {
          if (response.data.message) {
            // if we have a message, this means credentials are invalid
            setError(response.data.message); // set message to error so user knows to relogin
            console.log(response);
          } else {
            // otherwise, info is valid
            console.log(response);

            dispatch(
              login({
                firstname: response.data[0].first_name,
                lastname: response.data[0].last_name,
                email: response.data[0].email,
                loggedIn: true,
                role: response.data[0].role,
                profilepicture:
                  "http://localhost:5000/uploads/" +
                  response.data[0].profile_picture,
                vehicle: response.data[0].vehicle,
              })
            );
          }
        });
    }
  };
  console.log(user);

  return user.loggedIn === true ? (
    <Redirect to="/user" />
  ) : (
    <div className="sign-in-container">
      <img src={homeImage} className="img-div-home" />

      <form className="signin-form">
        <Image myStyle={{ color: "rgb(211,211,211)" }} />
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

        <button className="action-button" onClick={SumbitLogin}>
          {" "}
          Log In
        </button>
        <p>
          {/* Do not have an account? <button onClick={HandleFlip}>Register</button> */}
        </p>
      </form>
    </div>
  );
};

export default Login;
