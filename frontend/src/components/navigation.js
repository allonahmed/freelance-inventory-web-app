import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faUserCircle,
  faChartLine,
  faCog,
  faCommentAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { faKeycdn } from "@fortawesome/free-brands-svg-icons";
import Logout from "../assets/Logout";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/navigation.css";
import { logout } from "../features/user";

export const Image = (props) => {
  return (
    <div className="logo-container" style={props.myStyle}>
      <div className="main-header">
        <i className="fa fa-wrench logo-icon "></i>
        <h1 className="logo-title"> HQ</h1>
      </div>
      <div className="sub-heading">INVENTORY HEADQUARTERS</div>
    </div>
  );
};

const NavItems = (props) => {
  const path = window.location.pathname;
  const [expand1, setExpand1] = useState(
    path.includes("inventory") || path.includes("user")
  );
  const [expand2, setExpand2] = useState(path.includes("my"));
  const [expand3, setExpand3] = useState(path.includes("advanced"));
  const user = useSelector((state) => state.user.value);
  const [value, setValue] = useState(window.location.pathname);

  useEffect(() => {
    setValue(window.location.pathname);
  });
  const dispatch = useDispatch(logout());

  const variants = {
    open: { opacity: 1, postion: "absolute" },
    closed: { opacity: 0 },
  };
  const HandleClick = (event) => {
    // event.preventDefault();

    setExpand1(false);
  };
  return (
    <div className="nav-list-container">
      <Image />
      <ul className="nav-list">
        <motion.li
          style={expand1 ? { borderBottom: "none", margin: "0" } : {}}
          initial={false}
          onClick={() => {
            setExpand1(!expand1);
            setExpand2(false);
            setExpand3(false);
          }}
          onMouseEnter={() => {
            setExpand1(true);
            // setExpand2(false);
            // setExpand3(false);
          }}
          onMouseLeave={() => {
            if (path.includes("inventory")) {
              setExpand1(true);
            } else {
              setExpand1(false);
            }
          }}
          className="nav-item dropdown-button"
        >
          <NavLink
            className="nav-link"
            to="/inventory"
            style={expand1 ? { color: "white" } : null}
            // onClick={HandleClick}
            activeClassName="label-active"
          >
            {" "}
            <div className="nav-label">
              <p>Inventory </p>
              {expand1 ? (
                <FontAwesomeIcon icon={faChevronDown} className="icon-down" />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} className="icon-up" />
              )}
            </div>
          </NavLink>
          <AnimatePresence initial={false}>
            {expand1 && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", overflow: "hidden" },
                  collapsed: { opacity: 0, height: 0, overflow: "hidden" },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="dropdown-container"
              >
                <NavLink
                  // onClick={HandleClick}
                  className="dropdown-item"
                  to="/inventory/view"
                  activeClassName="active"
                >
                  View All Inventory
                </NavLink>
                <NavLink
                  // onClick={HandleClick}
                  className="dropdown-item"
                  to="/inventory/remove"
                  activeClassName="active"
                >
                  Remove From Vehicle
                </NavLink>
                <NavLink
                  // onClick={HandleClick}
                  className="dropdown-item"
                  activeClassName="active"
                  to="/inventory/add"
                >
                  Add To Vehicle
                </NavLink>
                <NavLink
                  // onClick={HandleClick}
                  className="dropdown-item"
                  to="/add_inventory"
                  style={user.role === "Manager" ? {} : { display: "none" }}
                >
                  Add New Inventory
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
        <motion.li
          initial={false}
          onClick={() => {
            setExpand2(!expand2);
            setExpand1(false);
            setExpand3(false);
          }}
          onMouseEnter={() => {
            setExpand2(true);
            // setExpand1(false);
            // setExpand3(false);
          }}
          onMouseLeave={() => {
            if (path.includes("my")) {
              setExpand2(true);
            } else {
              setExpand2(false);
            }
          }}
          className="nav-item dropdown-button"
        >
          <NavLink
            onClick={HandleClick}
            className="nav-link"
            to="/my/changes"
            activeClassName="active"
            // style={arrowDown1 ? { color: "white" } : null}
          >
            {" "}
            <div className="nav-label">
              <p>My Analytics </p>
              {expand2 ? (
                <FontAwesomeIcon icon={faChevronDown} className="icon-down" />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} className="icon-up" />
              )}
            </div>
          </NavLink>
          <AnimatePresence initial={false}>
            {expand2 && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", overflow: "hidden" },
                  collapsed: { opacity: 0, height: 0, overflow: "hidden" },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="dropdown-container"
                // style={!viewDrop1 ? { display: "none" } : null}
              >
                <NavLink
                  onClick={HandleClick}
                  className="dropdown-item"
                  to="/my/changes"
                >
                  My Changes
                </NavLink>
                <NavLink
                  onClick={HandleClick}
                  className="dropdown-item"
                  to="/my/vehicle"
                >
                  My Vehicle
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
        <motion.li
          initial={false}
          onClick={() => {
            setExpand3(!expand3);
            setExpand2(false);
            setExpand1(false);
          }}
          onMouseEnter={() => {
            setExpand3(true);
            // setExpand2(false);
            // setExpand1(false);
          }}
          onMouseLeave={() => {
            if (path.includes("advanced")) {
              setExpand3(true);
            } else {
              setExpand3(false);
            }
          }}
          className="nav-item dropdown-button"
        >
          <NavLink
            onClick={HandleClick}
            className="nav-link"
            to="/advanced"
            style={expand3 ? { color: "white" } : null}
          >
            {" "}
            <div className="nav-label">
              <p>Advanced </p>
              {expand3 ? (
                <FontAwesomeIcon icon={faChevronDown} className="icon-down" />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} className="icon-up" />
              )}
            </div>
          </NavLink>
          <AnimatePresence initial={false}>
            {expand3 && (
              <motion.div
                className="dropdown-container"
                // style={!viewDrop2 ? { display: "none" } : null}
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", overflow: "hidden" },
                  collapsed: { opacity: 0, height: 0, overflow: "hidden" },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <NavLink
                  onClick={HandleClick}
                  className="dropdown-item"
                  to="/advanced/chat"
                >
                  Team Chat
                </NavLink>
                <NavLink
                  onClick={HandleClick}
                  className="dropdown-item"
                  to="/advanced/roster"
                >
                  Team Roster
                </NavLink>
                <NavLink
                  onClick={HandleClick}
                  className="dropdown-item"
                  to="/advanced/history"
                >
                  View History
                </NavLink>
                <NavLink
                  onClick={HandleClick}
                  className="dropdown-item"
                  to="/advanced/create-user"
                >
                  Create User
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      </ul>
      <div className="footer-nav">
        <Profile
          name={user.firstname}
          profile={user.profilepicture}
          func={dispatch}
        />
        <div className="footer-icons">
          <FontAwesomeIcon icon={faCog} className="foot-icons" />
          <FontAwesomeIcon icon={faBell} className="foot-icons" />
          <FontAwesomeIcon icon={faCommentAlt} className="foot-icons" />
        </div>
      </div>
    </div>
  );
};

const Profile = (props) => {
  const [expand, setExpand] = useState(false);
  // const [viewDrop2, setDrop2] = useState(false);
  return (
    <div className="profile-img-container">
      <li
        style={{ listStyleType: "none" }}
        onMouseLeave={() => {
          setExpand(false);
        }}
        className="nav-item dropdown-button"
      >
        <AnimatePresence initial={false}>
          {expand && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto", overflow: "hidden" },
                collapsed: { opacity: 0, height: 0, overflow: "hidden" },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="dropdown-container"
              style={{
                alignItems: "center",
                width: "160px",
              }}
            >
              <NavLink
                style={{ textAlign: "center" }}
                className="dropdown-item"
                to="/user"
              >
                {props.name}
              </NavLink>
              <NavLink
                style={{ textAlign: "center" }}
                className="dropdown-item"
                to="/settings"
              >
                settings
              </NavLink>
              <NavLink
                style={{
                  paddingLeft: "-10px",

                  textAlign: "center",
                }}
                className="dropdown-item"
                to="/logout"
              >
                <Logout />
              </NavLink>
            </motion.div>
          )}{" "}
        </AnimatePresence>
        <NavLink
          onMouseEnter={() => {
            setExpand(true);
          }}
          className="picture-link"
          to=""
          activeClassName="profile-nav-link"
        >
          {props.profile ? (
            <img
              className="profile-picture-img"
              src={props.profile}
              alt="profile-img-navbar"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="profile-image" />
          )}
        </NavLink>
      </li>
    </div>
  );
};

export const Navigation = (props) => {
  return (
    <nav className="navigation" style={props.myStyle}>
      <NavItems />

      {/* <Profile
        name={user.firstname}
        profile={user.profilepicture}
        func={dispatch}
      /> */}
    </nav>
  );
};
