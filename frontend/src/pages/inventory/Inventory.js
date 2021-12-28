import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddInventory from "./AddInventory";
import RemoveInventory from "./RemoveInventory";
import ViewInventory from "./ViewInventory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/inventory.css";
import { NavLink } from "react-router-dom";

export const Inventory = (props) => {
  const isLogged = useSelector((state) => state.isLogged);
  const [value, setValue] = useState(props.name);

  useEffect(() => {
    setValue(window.location.pathname);
  });

  return (
    <div className="inventory-container">
      <NavLink activeClassName="inventory-active" to="/inventory/view">
        <button
          className="inventory-button"
          onClick={() => {
            setValue("viewInventory");
          }}
          style={
            value === "/inventory/view"
              ? { border: "3px solid white", color: "white" }
              : {}
          }
        >
          <FontAwesomeIcon className="button-icon" icon={faEye} />
          View All Inventory
        </button>
      </NavLink>
      <NavLink to="/inventory/add" activeClassName="inventory-active">
        <button
          className="inventory-button"
          onClick={() => {
            setValue("addInventory");
          }}
          style={
            value === "/inventory/add"
              ? { border: "3px solid white", color: "white" }
              : {}
          }
        >
          <FontAwesomeIcon className="button-icon" icon={faPlus} />
          Add To Vehicle
        </button>
      </NavLink>
      <NavLink activeClassName="inventory-active" exact to="/inventory/remove">
        <button
          className="inventory-button"
          onClick={() => {
            setValue("removeInventory");
          }}
          style={
            value === "/inventory/remove"
              ? { border: "3px solid white", color: "white" }
              : {}
          }
        >
          <FontAwesomeIcon className="button-icon" icon={faMinus} />
          Return to Warehouse
        </button>
      </NavLink>
    </div>
  );
};

export default Inventory;
