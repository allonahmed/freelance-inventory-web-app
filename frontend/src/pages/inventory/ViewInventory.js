import { useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";
import { inventoryColumns } from "../../components/table/columns";
import axios from "axios";
import Load from "../../assets/Loader";
import Table from "../../components/table/Table";
import { Inventory } from "./Inventory";
import "../../styles/inventory.css";

const ViewInventory = () => {
  const isLogged = useSelector((state) => state.isLogged);
  console.log(isLogged);
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
  const column = useMemo(() => inventoryColumns); // mandatory for our columns

  return (
    // <div className="app-wrapper">
    <div className="view-container">
      <Inventory />
      <div className="table-container" style={{ height: "75vh" }}>
        {itemList.length > 0 ? (
          <Table columns={column} data={updatedList(itemList)} />
        ) : (
          <Load />
        )}
      </div>
    </div>
    // </div>
  );
};

export default ViewInventory;
