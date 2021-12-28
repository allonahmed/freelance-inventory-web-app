import { useSelector } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import { addColumns } from "../../components/table/columns";
import Load from "../../assets/Loader";
import Table from "../../components/table/Table";
import axios from "axios";
import "../../styles/inventory.css";
import Inventory from "./Inventory";

//

const AddInventory = () => {
  const user = useSelector((state) => state.user.value);
  const vehicle = user.vehicle.charAt(0).toUpperCase() + user.vehicle.slice(1); //capitalized vehicle name

  const [itemList, setItemList] = useState([]); // to hold our data of inventory items

  const getData = async () => {
    //gets our data from server
    await axios.get("http://localhost:5000/get-items").then((resp) => {
      if (resp.data.message) {
        return;
      } else {
        setItemList(resp.data);
        console.log(itemList);
      }
    });
  };
  useEffect(() => {
    // get our data on load
    if (itemList.length === 0) {
      getData();
    }
  }, []);
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

  const newList = updatedList(itemList).filter((item) => {
    //filter to get only the rows with the vehicle of the user
    return item.current_location === "Warehouse";
  });
  const type = "add";

  const column = useMemo(() => addColumns);
  return (
    <div className="add-inventory" style={{ color: "white" }}>
      <Inventory />
      <div className="table-container" style={{ height: "75vh" }}>
        {itemList.length > 0 ? (
          <Table columns={column} data={newList} type={type} edit={true} />
        ) : (
          <Load />
        )}
      </div>{" "}
    </div>
  );
};

export default AddInventory;
