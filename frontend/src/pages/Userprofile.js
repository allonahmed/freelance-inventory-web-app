import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux"; //for accessing state
import {
  profileVehicleColumns,
  profileChangesColumns,
  profileInventoryColumns,
} from "../components/table/columns";
import axios from "axios";
import Load from "../assets/Loader";
import Table from "../components/table/Table";
import { login, logout } from "../features/user";
import { PortalWithState } from "react-portal";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "../assets/Logout";
import "../styles/user.css";
import { NavLink } from "react-router-dom";

const API_URL = "http://localhost:5000/upload-image";
const API_URL1 = "http://localhost:5000/get-vehicle-info-profile";
const API_URL2 = "http://localhost:5000/get-my-changes-profile";
const API_URL3 = "http://localhost:5000/get-items-profile";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const firstname =
    user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
  const lastname =
    user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
  const vehicle = user.vehicle.charAt(0).toUpperCase() + user.vehicle.slice(1);
  const email = user.email.charAt(0).toUpperCase() + user.email.slice(1);
  const [image, setImage] = useState({});
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [expand3, setExpand3] = useState(true);
  const [preview, setPreviewImage] = useState("");
  const [open, setOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [mouseOver1, setMouseOver1] = useState(false);
  const [vehicleData, setVehicle] = useState([]);
  const [changeData, setChange] = useState([]);
  const [allData, setAll] = useState([]);
  let vData = [];

  useEffect(() => {
    axios
      .post(API_URL1, {
        vehicle: vehicle,
      })
      .then((response) => {
        setVehicle(response.data);
      });
    axios
      .post(API_URL2, {
        username: firstname + " " + lastname,
      })
      .then((response) => {
        setChange(response.data);
      });
    axios.get(API_URL3).then((resp) => {
      if (resp.data.message) {
        return;
      } else {
        setAll(resp.data);
      }
    });
  }, [user]);

  console.log(vehicleData);

  const column = useMemo(() => profileVehicleColumns);
  const column1 = useMemo(() => profileChangesColumns);
  const column2 = useMemo(() => profileInventoryColumns);
  useEffect(() => {
    if (open) {
      // document.getElementById("root").style.filter = "grayscale(100%)";
      document.getElementById("root").style.opacity = ".5";
    } else {
      document.getElementById("root").style.opacity = "1";
    }
  }, [open]);

  const imageHandler = (event) => {
    event.preventDefault();
    console.log(image);

    if (data.length === 0) {
      setError("You must enter an image!!!!");
    } else {
      console.log(image);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("email", user.email);
      console.log(formData);
      axios({
        url: API_URL,
        method: "post",
        data: formData,
        body: {
          email: user.email,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          console.log(response.data);

          setError("✅  Uploaded");
          axios
            .post("http://localhost:5000/get-profile-info", {
              email: user.email,
            })
            .then((resp) => {
              if (resp.data.message) {
                console.log(resp.data.message);
              } else {
                console.log(resp.data);

                dispatch(
                  login({
                    firstname: resp.data[0].first_name,
                    lastname: resp.data[0].last_name,
                    email: resp.data[0].email,
                    loggedIn: true,
                    role: resp.data[0].role,
                    profilepicture:
                      "http://localhost:5000/uploads/" +
                      resp.data[0].profile_picture,
                    vehicle: resp.data[0].vehicle,
                  })
                );
              }
            });
        }
      });
    }
  };
  const pad = (num, size) => {
    //helper to pad 0's in front of smaller ID's
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };

  const updatedList = (data) => {
    // then we iterate through our data and pass the pad function to the ID's
    for (let i = 0; i < data.length; i++) {
      data[i]["item_id"] = pad(data[i]["item_id"], 5);
    }
    return data;
  };

  return (
    <div className="user-container">
      <div className="profile-stats">
        <h3 style={{ textDecoration: "underline" }}>Quick Analytics</h3>

        <motion.div
          className="profile-header"
          style={expand1 ? { borderBottom: "none", margin: "0" } : {}}
          initial={false}
          onClick={() => {
            setExpand1(!expand1);
            setExpand2(false);
            setExpand3(false);
          }}
        >
          {expand1 ? (
            <FontAwesomeIcon icon={faChevronDown} className="drop-icon" />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} className="up-icon" />
          )}
          <h3
            style={{ position: "absolute", textAlign: "center", width: "100%" }}
          >
            Recent Updates
          </h3>
          <NavLink
            to="/my/changes"
            className="view-all-button"
            onClick={(event) => {
              event.stopPropagation(); // prevents parent click from being called
            }}
          >
            View More{" "}
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ marginTop: "2px", marginLeft: "3px" }}
            />
          </NavLink>
        </motion.div>

        <AnimatePresence initial={false}>
          {expand1 &&
            (changeData.length > 0 ? (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    height: "55vh",
                    overflow: "hidden",
                    background: "none",
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                    overflow: "hidden",
                  },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="table-container"
                style={{
                  height: "55vh",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "20px",
                }}
              >
                <Table
                  columns={column1}
                  data={updatedList(changeData)}
                  profile={true}
                  myStyle={{ borderRadius: "0" }}
                />
              </motion.div>
            ) : (
              <Load />
            ))}
        </AnimatePresence>
        <motion.div
          className="profile-header"
          style={expand2 ? { borderBottom: "none", margin: "0" } : {}}
          initial={false}
          onClick={() => {
            setExpand2(!expand2);
            setExpand1(false);
            setExpand3(false);
          }}
        >
          {expand2 ? (
            <FontAwesomeIcon icon={faChevronDown} className="drop-icon" />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} className="up-icon" />
          )}
          <h3
            style={{ position: "absolute", textAlign: "center", width: "100%" }}
          >
            {firstname}'s Vehicle Items
          </h3>
          <NavLink
            to="/my/vehicle"
            className="view-all-button"
            onClick={(event) => {
              event.stopPropagation(); // prevents parent click from being called
            }}
          >
            View More{" "}
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ marginTop: "2px", marginLeft: "3px" }}
            />
          </NavLink>
        </motion.div>
        <AnimatePresence initial={false}>
          {expand2 &&
            (vehicleData.length > 0 ? (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "55vh", overflow: "hidden" },
                  collapsed: { opacity: 0, height: 0, overflow: "hidden" },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="table-container"
                style={{
                  height: "55vh",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "20px",
                }}
              >
                <Table
                  columns={column}
                  data={updatedList(vehicleData)}
                  profile={true}
                  myStyle={{ borderRadius: "0" }}
                />
              </motion.div>
            ) : (
              <Load />
            ))}
        </AnimatePresence>
        <motion.div
          className="profile-header"
          style={expand3 ? { borderBottom: "none", margin: "0" } : {}}
          initial={false}
          onClick={() => {
            setExpand3(!expand3);
            setExpand2(false);
            setExpand1(false);
          }}
        >
          {expand3 ? (
            <FontAwesomeIcon icon={faChevronDown} className="drop-icon" />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} className="up-icon" />
          )}
          <h3
            style={{ position: "absolute", textAlign: "center", width: "100%" }}
          >
            Total Inventory
          </h3>
          <NavLink
            to="/inventory/view"
            className="view-all-button"
            onClick={(event) => {
              event.stopPropagation(); // prevents parent click from being called
            }}
          >
            View More{" "}
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ marginTop: "2px", marginLeft: "3px" }}
            />
          </NavLink>
        </motion.div>

        <AnimatePresence initial={false}>
          {expand3 &&
            (allData.length > 0 ? (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "55vh", overflow: "hidden" },
                  collapsed: { opacity: 0, height: 0, overflow: "hidden" },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="table-container"
                style={{
                  height: "55vh",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "20px",
                }}
              >
                <Table
                  columns={column2}
                  data={updatedList(allData)}
                  profile={true}
                  myStyle={{ borderRadius: "0" }}
                />
              </motion.div>
            ) : (
              <Load />
            ))}
        </AnimatePresence>
      </div>
      <div className="profile-container">
        <div className="user-photo-container">
          <img
            id="profile-picture"
            src={
              user.profilepicture
                ? user.profilepicture
                : "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
            }
            alt="profile"
          />

          <PortalWithState
            closeOnEsc={false}
            closeOnOutsideClick={false}
            node={document.getElementById("portal")}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
          >
            {({ openPortal, closePortal, isOpen, portal }) => (
              <div className="portal-div">
                <button onClick={openPortal} id="change-profile-picture">
                  change profile picture
                </button>
                {portal(
                  <div className="user-modal" style={{ alignItems: "" }}>
                    {preview.length === 0 ? (
                      <div
                        style={{
                          color: "white",
                          height: "350px",
                          width: "350px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                        className="empty-preview"
                      >
                        <label htmlFor="file-upload" className="enter-image">
                          <i
                            style={{ paddingTop: "45px", fontSize: "40px" }}
                            className="fa fa-plus"
                          ></i>{" "}
                          <p>Upload Image</p>
                        </label>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          id="file-upload"
                          multiple={false}
                          value={data}
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                            setData(e.target.value);
                            let file = e.target.files[0];
                            let reader = new FileReader();
                            let url = reader.readAsDataURL(file);
                            reader.onloadend = function (e) {
                              setPreviewImage([reader.result]);
                            };
                          }}
                          placeholder="choose a photo"
                        />
                      </div>
                    ) : (
                      <div style={{ color: "white" }} className="image-preview">
                        {" "}
                        <img
                          style={{
                            height: "350px",
                            width: "350px",
                            borderRadius: "50%",
                            border: "1px solid white",
                          }}
                          src={preview}
                        />
                      </div>
                    )}
                    <div style={{ color: "white" }}>{error}</div>

                    {error === "✅  Uploaded" ? (
                      <button
                        className="action-button"
                        onClick={() => {
                          setImage("");
                          setData("");
                          setPreviewImage("");
                          setError("");
                          closePortal();
                        }}
                      >
                        Return
                      </button>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <button
                          // disabled={data.length === 0}
                          className="action-button"
                          onClick={() => {
                            if (data.length > 0) {
                              setImage("");
                              setData("");
                              setPreviewImage("");
                              setError("");
                            } else {
                              closePortal();
                            }
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          disabled={data.length === 0}
                          onClick={imageHandler}
                          className="action-button"
                        >
                          Upload
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </PortalWithState>
        </div>
        <p className="role-highlight">{user.role}</p>

        <div className="user-info">
          <div
            style={{
              display: "flex",
              height: "40px",
              alignItems: "center",
            }}
          >
            <p className="stats-id">Status:</p>
            <p style={{ display: "flex", alignItems: "center" }}>
              {user.loggedIn ? "Online" : "False"}
              <div
                style={
                  user.loggedIn
                    ? {
                        background: "green",
                        height: "12px",
                        width: "12px",
                        borderRadius: "50%",
                        marginLeft: "5px",
                      }
                    : { background: "green", height: "5px", width: "5px" }
                }
                className="circle"
              ></div>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              height: "40px",
              alignItems: "center",
            }}
          >
            <p className="stats-id">Firstname:</p>
            <p>{firstname}</p>
          </div>
          <div
            style={{
              display: "flex",
              height: "40px",
              alignItems: "center",
            }}
          >
            <p className="stats-id">Lastname:</p>
            <p>{lastname}</p>
          </div>
          <div
            style={{
              display: "flex",
              height: "40px",
              alignItems: "center",
            }}
          >
            <p className="stats-id">Vehicle:</p>
            <p>{user.vehicle[user.vehicle.length - 1]}</p>
          </div>
          <div
            style={{
              display: "flex",
              height: "40px",
              alignItems: "center",
            }}
          >
            <p className="stats-id">Email:</p>
            <p>{email}</p>
          </div>
        </div>
        <Logout
          myStyle={{
            color: "white",
            background: "rgb(0,17,92)",
            height: "40px",
            width: "120px",
            border: "1px solid white",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
