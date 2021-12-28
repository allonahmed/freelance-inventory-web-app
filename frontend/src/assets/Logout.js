import React from "react";
import { useDispatch } from "react-redux"; //for modifying state
import { logout } from "../features/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Logout = (props) => {
  const dispatch = useDispatch();

  return (
    <button
      style={
        props.myStyle
          ? props.myStyle
          : {
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              color: "black",
              marginLeft: "-5px",
            }
      }
      onClick={() => {
        dispatch(logout());
        window.location.href = "/";
      }}
    >
      {/* <FontAwesomeIcon icon={faSignOutAlt} className="nav-icons" /> */}
      Logout
    </button>
  );
};

export default Logout;
